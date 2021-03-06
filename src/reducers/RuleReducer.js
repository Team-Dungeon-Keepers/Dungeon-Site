// filler file to help Github confirm file structures

import { 
  FETCH_START, 
  FETCH_FAIL, 
  } from '../actions/Actions';

import {
  ADD_RULES,
  ADD_SINGLE_RULE,
  DELETE_RULE,
  EDIT_RULE
} from '../actions/RuleActions';
  
  const initialState = {
    rule: {
      rulesid: 0,
      rulesname: ''
    },
    rules: [],
    isFetching: false,
    error: ''
  };
  
  export const RuleReducer = (state = initialState, action) => {
    switch (action.type) {
      case(FETCH_START):
        return({
          ...state,
          isFetching: true
        })
      case(ADD_RULES):
        return({
          ...state,
          rules: action.payload,
          isFetching: false
        })
      case(ADD_SINGLE_RULE):
        return ({
          ...state,
          rules: [...state.rules, action.payload]
        })
      case(FETCH_FAIL):
        return({
          ...state,
          error: action.payload,
          isFetching: false
        })
      case(EDIT_RULE):
        const editRule = state.rules.find((c) => c.rulesid === action.payload);
        return({
          ...state,
          rule: editRule,
        })
      case(DELETE_RULE):
        const deleteRule = state.classes.filter(c=>(action.payload !== c.rulesid))
        return({
          ...state,
          rules: deleteRule
        })
      
      default:
        return state;
    }
  };
  export default RuleReducer;