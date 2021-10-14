import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import { FETCH_FAIL, FETCH_START, FETCH_SUCCESS } from './Actions';

export const ADD_GAMES = "ADD_GAMES";
export const DELETE_GAME = "DELETE_GAME";
export const CREATE_GAME = "CREATE_GAME";
export const UPDATE_GAME = "UPDATE_GAME";
export const EDIT_GAME = "EDIT_GAME";
export const ADD_SINGLE_GAME = "ADD_SINGLE_GAME";
export const GET_GAMES = "GET_GAMES";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";

export const fetchStart = ()=> {
  return({type: FETCH_START});
}

export const getGames = () => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get('/games')
    .then(res=> {
      dispatch({type: ADD_GAMES, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const getGameByID = (gamesid) => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get(`/games/${gamesid}`)
    .then(res=> {
      dispatch({type: DELETE_GAME, payload: gamesid});
      dispatch({type: ADD_SINGLE_GAME, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const createGame = game => {
  return {type: CREATE_GAME , payload: game}
}

export const addGames = game => {
  return {type: ADD_GAMES, payload: game}
}

export const editGame = (editedGame, gameid) => {
  return (dispatch => {
    dispatch(fetchStart());

    axios
    .put('https://dungeon-site-api/api/games/', editedGame)
    .then((res) => {
      dispatch({type: DELETE_GAME, payload: gameid});
      dispatch({type: ADD_SINGLE_GAME, payload:res.data});
    })
    .catch((err) => {
      dispatch({type: FETCH_FAIL, payload:err});
      console.log('ERROR', err);
    });
  })
}

export const updateGame = game => {
  return {type: UPDATE_GAME, payload: game}
}

export const deleteGame = (gameid) => {
  return (dispatch => {
    dispatch(fetchStart());

    axios
    .delete('https://dungeon-site-api/api/games/', gameid)
    .then((res) => {
      dispatch({type: DELETE_GAME, payload: gameid});
    })
    .catch((err) => {
      dispatch({type: FETCH_FAIL, payload:err});
      console.log('ERROR', err);
    });
  })
}
