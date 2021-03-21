const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const events = require("./routes/api/events");
const comments = require("./routes/api/comments");
const profile = require("./routes/api/profile");
const notification = require("./routes/api/notification");
const app = express();

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true,})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// passing token & Serializing for Session ( Passport middleware )

function authorized(request, response, next) {
  passport.authenticate("jwt", { session: false }, async (error, token) => {
    if (error || !token) {
      response.status(401).json({ message: "Unauthorized" });
    }
    try {
      const user = await User.findOne({
        where: { id: token.id },
      });
      request.user = user;
    } catch (error) {
      next(error);
    }
    next();
  })(request, response, next);
}

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users, authorized);
app.use("/api/events", events);
app.use("/api/events", comments);
app.use("/api/profile", profile);
app.use("/api/notification", notification);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let port = 8081;

if (process.env.NODE_ENV === "production") {
  port = process.env.PORT;
}

app.listen(port, () => console.log(`Server running on port ${port}`));
