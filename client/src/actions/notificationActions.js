import axios from '../axios-lists';

import { GET_NOTIFICATION  } from './types';

const token = localStorage.getItem("jwtToken"); //Or however you choose to get it

export const getNotification = () => dispatch => {
  axios
    .get(`/api/notification`, {headers : {Authorization : token}})
    .then(res => 
        dispatch({
            type: GET_NOTIFICATION,
            payload: res.data
        })
    )
    .catch(err =>
        console.log(err)
    );
};

export const checkNotification = () => dispatch => {
  axios
    .put(`/api/notification/check`, {headers : {Authorization : token}})
    .catch(err =>
        console.log(err)
    );
};

export const removeNotification = id => dispatch => {
  axios
    .delete(`/api/notification/${id}` , {headers : {Authorization : token}})
    .then(res => 
        dispatch(getNotification())
    )
    .catch(err =>
        console.log(err)
    );
};