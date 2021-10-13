import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import { FETCH_FAIL, FETCH_START, FETCH_SUCCESS } from './Actions';

export const ADD_GAME = "ADD_GAME";
export const DELETE_GAME = "DELETE_GAME";
export const CREATE_GAME = "CREATE_GAME";
export const UPDATE_GAME = "UPDATE_GAME";
export const EDIT_GAME = "EDIT_GAME";

export const fetchClasses = () => {
  return (dispatch => {
    dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get('/game')
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
      .post('https://dungeon-site-api/api/game/', item)
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

export const createGame = game => {
return {type: CREATE_GAME , payload: game}
}
export const addGame = game => {
return {type: ADD_GAME, payload: game}
}
export const editGame = game => {
return {type: EDIT_GAME, payload: game}
}
export const updateGame = game => {
return {type: UPDATE_GAME, payload: game}
}
export const deleteGame = game => {
return {type: DELETE_GAME, payload: game}
}

export const fetchStart = () =>  {
  return ({type:FETCH_START})
}
