import axios from "../axios-lists";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  GET_NOTIFICATION,
} from "./types";

const token = localStorage.getItem("jwtToken"); //Or however you choose to get it


export const getCurrentProfile = () => (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  console.log(token);
  dispatch(setProfileLoading());
  dispatch(getNotification());
  axios
    .get("/api/profile", {headers : {Authorization : token}})
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

export const getUserProfile = (id) => (dispatch) => {
  dispatch(setProfileLoading());
  dispatch(getNotification());
  axios
    .get(`/api/profile/user/${id}`, {headers : {Authorization : token}})
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData, {headers : {Authorization : token}})
    .then(() => dispatch(getUserProfile()))
    .then((res) => history.push("/profile"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setProfileLoading = (token) => {
  return {
    type: PROFILE_LOADING,
  };
};

export const getNotification = () => (dispatch) => {
  axios
    .get(`/api/notification`,{headers : {Authorization : token}
    })
    .then((res) =>
      dispatch({
        type: GET_NOTIFICATION,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
