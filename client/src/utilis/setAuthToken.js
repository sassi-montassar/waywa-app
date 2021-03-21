import axios from 'axios';

const setAuthToken = jwtToken => {
    if(jwtToken){
        axios.defaults.headers.common['Authorization'] = jwtToken;
    }
    else{
         axios.defaults.headers.common['Authorization'] = null;
    }
};

export default setAuthToken;