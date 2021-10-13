// filler file to help Github confirm file structure
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

import { FETCH_FAIL, FETCH_START } from './Actions';

export const ADD_RULES = "ADD_RULES";
export const ADD_SINGLE_RULE = "ADD_SINGLE_RULE";
export const CREATE_RULE = "CREATE_RULE";
export const DELETE_RULE = "DELETE_RULE";
export const EDIT_RULE = "EDIT_RULE";
export const GET_RULES = "GET RULES";
export const GET_RULE_BY_ID = "GET_RULE_BY_ID";

export const getRules = () => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get('/rules')
    .then(res=> {
      dispatch({type: ADD_RULES, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const getRuleByID = (rulesid) => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get(`/rules/${rulesid}`)
    .then(res=> {
      dispatch({type: DELETE_RULE, payload: rulesid});
      dispatch({type: ADD_SINGLE_RULE, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const createRule = (item) => {
    return (dispatch => {
      dispatch(fetchStart());
      axios
      .post('https://dungeon-site-api/api/rules/', item)
      .then((res) => {
        dispatch(addRule(res.data))
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

  export const editRule = (editedRule) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .put('https://dungeon-site-api/api/rules/', editedRule)
      .then((res) => {
        dispatch({type: DELETE_RULE, payload: editedRule.rulesid});
        dispatch({type: ADD_SINGLE_RULE, payload:res.data});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
  };
  
  export const addRule = c => {
    return ({type: ADD_SINGLE_RULE, payload:c})
  }
  
  export const deleteRule = (rulesid) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .delete('https://dungeon-site-api/api/rules/', rulesid)
      .then((res) => {
        dispatch({type: DELETE_RULE, payload: rulesid});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
 }
