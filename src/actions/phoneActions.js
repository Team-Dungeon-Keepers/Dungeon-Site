import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import { FETCH_FAIL, FETCH_START, FETCH_SUCCESS } from './Actions';

export const ADD_PHONE = "ADD_PHONE";
export const DELETE_PHONE = "DELETE_PHONE";
export const CREATE_PHONE = "CREATE_PHONE";
export const UPDATE_PHONE = "UPDATE_PHONE";
export const EDIT_PHONE = "EDIT_PHONE";

export const fetchClasses = () => {
  return (dispatch => {
    dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get('/phones')
    .then(res=> {
      //console.log('classes', res.data);
      dispatch({type: FETCH_SUCCESS, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}


export const postNewClass = (item) => {
    return (dispatch => {
      dispatch({type:FETCH_START});
  
      dispatch(fetchStart());
      axios
      .post('https://dungeon-site-api/api/phones/', item)
      .then((res) => {
        dispatch({type: FETCH_SUCCESS, payload:res.data})
        //console.log(res);
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
  }

export const createPhone = phone => {
return {type: CREATE_PHONE , payload: phone}
}
export const addPhone = phone => {
return {type: ADD_PHONE, payload: phone}
}
export const editPhone = phone => {
return {type: EDIT_PHONE, payload: phone}
}
export const updatePhone = phone => {
return {type: UPDATE_PHONE, payload: phone}
}
export const deletePhone = phone => {
return {type: DELETE_PHONE, payload: phone}
}
