// filler file to help Github confirm file structures

import { 
  FETCH_START, 
  FETCH_SUCCESS, 
  FETCH_FAIL, 
  } from '../actions/Actions';

import {
  ADD_SCHEDULES,
  ADD_SINGLE_SCHEDULE,
  EDIT_SCHEDULE
} from '../actions/ScheduleActions';
  
  const initialState = {
    schedule: {
      schedulesid: 0,
      schedulesstarttime: '',
      schedulesendtime: '',
      schedulesstartdate: '',
      schedulesenddate: '',
      schedulessetting: 0
    },
    schedules: [],
    isFetching: false,
    error: ''
  };
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case(FETCH_START):
        return({
          ...state,
          isFetching: true
        })
      case(ADD_SCHEDULES):
        return({
          ...state,
          schedules: action.payload,
          isFetching: false
        })
      case(ADD_SINGLE_SCHEDULE):
        return ({
          ...state,
          schedules: [...schedules, action.payload]
        })
      case(FETCH_FAIL):
        return({
          ...state,
          error: action.payload,
          isFetching: false
        })
      case(EDIT_SCHEDULE):
        const editSchedule = state.schedules.find((c) => c.schedulesid === action.payload);
        return({
          ...state,
          schedule: editSchedule,
        })
      case(DELETE_SCHEDULE):
        const deleteSchedule = state.classes.filter(c=>(action.payload !== c.schedulesid))
        return({
          ...state,
          schedules: deleteSchedule
        })
      
      default:
        return state;
    }
  };