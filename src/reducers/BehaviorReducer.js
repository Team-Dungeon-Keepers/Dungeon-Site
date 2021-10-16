// filler file to help Github confirm file structures

import { 
  FETCH_START, 
  FETCH_FAIL, 
  } from '../actions/Actions';

import {
  ADD_BEHAVIORS,
  ADD_SINGLE_BEHAVIOR,
  DELETE_BEHAVIOR,
  EDIT_BEHAVIOR
} from '../actions/behaviorActions';
  
  const initialState = {
    behavior: {
      behaviorid: 0,
      behavior: ''
    },
    behaviors: [],
    isFetching: false,
    error: ''
  };
  
  export const behaviorReducer = (state = initialState, action) => {
    switch (action.type) {
      case(FETCH_START):
        return({
          ...state,
          isFetching: true
        })
      case(ADD_BEHAVIORS):
        return({
          ...state,
          behaviors: action.payload,
          isFetching: false
        })
      case(ADD_SINGLE_BEHAVIOR):
        return ({
          ...state,
          behaviors: [...state.behaviors, action.payload]
        })
      case(FETCH_FAIL):
        return({
          ...state,
          error: action.payload,
          isFetching: false
        })
      case(EDIT_BEHAVIOR):
        const editBehavior = state.behaviors.find((c) => c.behaviorid === action.payload);
        return({
          ...state,
          behavior: editBehavior
        })
      case(DELETE_BEHAVIOR):
        const deleteBehavior = state.behaviors.filter(c=>(action.payload !== c.behaviorid))
        return({
          ...state,
          behaviors: deleteBehavior
        })
      
      default:
        return state;
    }
  };