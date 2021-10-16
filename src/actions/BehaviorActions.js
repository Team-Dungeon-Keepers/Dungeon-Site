import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

import { FETCH_FAIL, FETCH_START } from './Actions';

export const ADD_BEHAVIORS = "ADD_BEHAVIORS";
export const ADD_SINGLE_BEHAVIOR = "ADD_SINGLE_BEHAVIOR";
export const CREATE_BEHAVIOR = "CREATE_BEHAVIOR";
export const DELETE_BEHAVIOR = "DELETE_BEHAVIOR";
export const EDIT_BEHAVIOR = "EDIT_BEHAVIOR";
export const GET_BEHAVIORS = "GET BEHAVIORS";
export const GET_BEHAVIOR_BY_ID = "GET_BEHAVIOR_BY_ID";

export const getBehaviors = () => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get('/behaviors')
    .then(res=> {
      dispatch({type: ADD_BEHAVIORS, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const getBehaviorByID = (behaviorid) => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get(`/behaviors/${behaviorid}`)
    .then(res=> {
      dispatch({type: DELETE_BEHAVIOR, payload: behaviorid});
      dispatch({type: ADD_SINGLE_BEHAVIOR, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const createBehavior = (item) => {
    return (dispatch => {
      dispatch(fetchStart());
      axios
      .post('https://dungeon-site-api/api/behaviors/', item)
      .then((res) => {
        dispatch(addBehavior(res.data))
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

  export const editBehavior = (editedBehavior) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .put('https://dungeon-site-api/api/behaviors/', editedBehavior)
      .then((res) => {
        dispatch({type: DELETE_BEHAVIOR, payload: editedBehavior.behaviorid});
        dispatch({type: ADD_SINGLE_BEHAVIOR, payload:res.data});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
  };
  export const addBehavior = (behavior) => {
    return ({type: ADD_SINGLE_BEHAVIOR, payload: behavior})
  };
  
  export const deleteBehavior = (behaviorid) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .delete('https://dungeon-site-api/api/behaviors/', behaviorid)
      .then((res) => {
        dispatch({type: DELETE_BEHAVIOR, payload: behaviorid});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
 }


