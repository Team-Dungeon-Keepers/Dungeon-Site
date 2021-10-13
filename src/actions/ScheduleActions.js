import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import {FETCH_START, FETCH_FAIL, fetchStart} from 'Actions';
//import fetchStart from 'Actions';
export const EDIT_SCHEDULE = 'EDIT_SCHEDULE';
export const DELETE_SCHEDULE = "DELETE_SCHEDULE";
export const ADD_SCHEDULE = "ADD_SCHEDULE";
export const UPDATE_SCHEDULE = "UPDATE_SCHEDULE";
export const CREATE_SCHEDULE = "CREATE_SCHEDULE";
export const GET_SCHEDULE_BY_ID = "GET_SCHEDULE_BY_ID";
export const ADD_SINGLE_SCHEDULE = "ADD_SINGLE_SCHEDULE";

export const getSchedules = () => {
  return (dispatch => {
    dispatch(fetchStart());
    axiosWithAuth().get('/schedules')
    .then(res=> {
      dispatch({type: ADD_SCHEDULES, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const getScheduleByID = (schedulesid) => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get(`/schedules/${schedulesid}`)
    .then(res=> {
      dispatch({type: DELETE_SCHEDULE, payload: Schedulesid});
      dispatch({type: ADD_SINGLE_SCHEDULE, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const createSchedule = (item) => {
    return (dispatch => {
      dispatch(fetchStart());
      axios
      .post('https://dungeon-site-api/api/schedules/', item)
      .then((res) => {
        dispatch(addSchedule(res.data))
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
  }

  //export const fetchStart = ()=> {
  //  return({type: FETCH_START});
  //}

  export const editSchedule = (editedSchedule) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .put('https://dungeon-site-api/api/schedules/', editedSchedule)
      .then((res) => {
        dispatch({type: DELETE_SCHEDULE, payload: schedulesid});
        dispatch({type: ADD_SINGLE_SCHEDULE, payload:res.data});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
  };
  
  
  export const deleteSchedule = (schedulesid) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .delete('https://dungeon-site-api/api/schedules/', schedulesid)
      .then((res) => {
        dispatch({type: DELETE_SCHEDULE, payload: schedulesid});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
 }

  export const addSchedule = a => {
    return ({type:ADD_SCHEDULE, payload:a})
  }