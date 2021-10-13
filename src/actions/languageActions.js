import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import { FETCH_FAIL, FETCH_START, FETCH_SUCCESS } from './Actions';

export const ADD_LANG = "ADD_LANG";
export const DELETE_LANG = "DELETE_LANG";
export const CREATE_LANG = "CREATE_LANG";
export const UPDATE_LANG = "UPDATE_LANG";
export const EDIT_LANG = "EDIT_LANG";

export const fetchClasses = () => {
  return (dispatch => {
    dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get('/languages')
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
      .post('https://dungeon-site-api/api/languages/', item)
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

export const createlang = language => {
return {type: CREATE_LANG , payload: language}
}
export const addLang = language => {
return {type: ADD_LANG, payload: language}
}
export const editLang = language => {
return {type: EDIT_LANG, payload: language}
}
export const updateLang = language => {
return {type: UPDATE_LANG, payload: language}
}
export const deleteLang = language => {
return {type: DELETE_LANG, payload: language}
}

export const fetchStart = () =>  {
  return ({type:FETCH_START})
}
