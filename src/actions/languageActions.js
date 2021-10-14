import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import { FETCH_FAIL, FETCH_START, FETCH_SUCCESS } from './Actions';

export const ADD_LANGS = "ADD_LANGS";
export const ADD_SINGLE_LANG = "ADD_SINGLE_LANG";
export const DELETE_LANG = "DELETE_LANG";
export const CREATE_LANG = "CREATE_LANG";
export const UPDATE_LANG = "UPDATE_LANG";
export const EDIT_LANG = "EDIT_LANG";
export const GET_LANGS = "GET_LANG";
export const GET_LANG_BY_ID = "GET_LANG_BY_ID";

export const fetchStart = ()=> {
  return({type: FETCH_START});
}

export const getLang = () => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get('/languages')
    .then(res=> {
      dispatch({type: ADD_LANG, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const getLangByID = (languageid) => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get(`/languages/${languageid}`)
    .then(res=> {
      dispatch({type: DELETE_LANG, payload: languageid});
      dispatch({type: ADD_SINGLE_LANG, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const createlang = (item) => {
  return (dispatch => {
    dispatch(fetchStart());
    axios
    .post('https://dungeon-site-api/api/languages/', item)
    .then((res) => {
      dispatch(addLang(res.data))
    })
    .catch((err) => {
      dispatch({type: FETCH_FAIL, payload:err});
      console.log('ERROR', err);
    });
  })
}

export const addLang = (language) => {
  return {type: ADD_LANG, payload: language}
}

export const editLang = (languageid) => {
  return (dispatch => {
    dispatch(fetchStart());

    axios
    .put('https://dungeon-site-api/api/languages/', editedLang)
    .then((res) => {
      dispatch({type: DELETE_LANG, payload: languageid});
      dispatch({type: ADD_SINGLE_LANGUAGE, payload:res.data});
    })
    .catch((err) => {
      dispatch({type: FETCH_FAIL, payload:err});
      console.log('ERROR', err);
    });
  })
}

export const updateLang = (language) => {
  return {type: UPDATE_LANG, payload: language}
}

export const deleteLang = (languageid) => {
  return (dispatch => {
    dispatch(fetchStart());

    axios
    .delete('https://dungeon-site-api/api/languages/', languageid)
    .then((res) => {
      dispatch({type: DELETE_LANG, payload: languageid});
    })
    .catch((err) => {
      dispatch({type: FETCH_FAIL, payload:err});
      console.log('ERROR', err);
    });
  })
}
