import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

import { FETCH_FAIL, FETCH_START } from './Actions';

export const ADD_USERS = "ADD_USERS";
export const ADD_SINGLE_USER = "ADD_SINGLE_USER";
export const CREATE_USER = "CREATE_USER";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";
export const GET_USERS = "GET USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";

export const getUsers = () => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get('/users')
    .then(res=> {
      dispatch({type: ADD_USERS, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const getUserByID = (userid) => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get(`/users/${userid}`)
    .then(res=> {
      dispatch({type: DELETE_USER, payload: userid});
      dispatch({type: ADD_SINGLE_USER, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const createUser = (item) => {
    return (dispatch => {
      dispatch(fetchStart());
      axios
      .post('https://dungeon-site-api/api/users/', item)
      .then((res) => {
        dispatch(addUser(res.data))
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
  }

  export const fetchStart = ()=> {
    return({type: FETCH_START});
  }

  export const editUser = (editedUser) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .put('https://dungeon-site-api/api/users/', editedUser)
      .then((res) => {
        dispatch({type: DELETE_USER, payload: editedUser.userid});
        dispatch({type: ADD_SINGLE_USER, payload:res.data});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
  };
  export const addUser = (user) => {
    return ({type: ADD_SINGLE_USER, payload: user})
  };
  
  export const deleteUser = (userid) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .delete('https://dungeon-site-api/api/users/', userid)
      .then((res) => {
        dispatch({type: DELETE_USER, payload: userid});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
 }


