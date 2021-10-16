import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

import { FETCH_FAIL, FETCH_START } from './Actions';

export const ADD_LINKS = "ADD_LINKS";
export const ADD_SINGLE_LINK = "ADD_SINGLE_LINK";
export const CREATE_LINK = "CREATE_LINK";
export const DELETE_LINK = "DELETE_LINK";
export const EDIT_LINK = "EDIT_LINK";
export const GET_LINKS = "GET LINKS";
export const GET_LINK_BY_ID = "GET_LINK_BY_ID";

export const getLinks = () => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get('/links')
    .then(res=> {
      dispatch({type: ADD_LINKS, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const getLinkByID = (linkid) => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get(`/links/${linkid}`)
    .then(res=> {
      dispatch({type: DELETE_LINK, payload: linkid});
      dispatch({type: ADD_SINGLE_LINK, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const createLink = (item) => {
    return (dispatch => {
      dispatch(fetchStart());
      axios
      .post('https://dungeon-site-api/api/links/', item)
      .then((res) => {
        dispatch(addLink(res.data))
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

  export const editLink = (editedLink) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .put('https://dungeon-site-api/api/links/', editedLink)
      .then((res) => {
        dispatch({type: DELETE_LINK, payload: editedLink.linkid});
        dispatch({type: ADD_SINGLE_LINK, payload:res.data});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
  };
  export const addLink = (link) => {
    return ({type: ADD_SINGLE_LINK, payload: link})
  };
  
  export const deleteLink = (linkid) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .delete('https://dungeon-site-api/api/links/', linkid)
      .then((res) => {
        dispatch({type: DELETE_LINK, payload: linkid});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
 }


