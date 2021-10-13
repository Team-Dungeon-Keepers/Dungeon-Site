// filler file to help Github confirm file structures

import { 
  FETCH_START, 
  FETCH_FAIL, 
  } from '../actions/Actions';

import {
  ADD_USERS,
  ADD_SINGLE_USER,
  DELETE_USER,
  EDIT_USER
} from '../actions/userActions';
  
  const initialState = {
    user: {
      userid: 0,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    },
    users: [],
    isFetching: false,
    error: ''
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case(FETCH_START):
        return({
          ...state,
          isFetching: true
        })
      case(ADD_USERS):
        return({
          ...state,
          users: action.payload,
          isFetching: false
        })
      case(ADD_SINGLE_USER):
        return ({
          ...state,
          users: [...state.users, action.payload]
        })
      case(FETCH_FAIL):
        return({
          ...state,
          error: action.payload,
          isFetching: false
        })
      case(EDIT_USER):
        const editUser = state.users.find((c) => c.userid === action.payload);
        return({
          ...state,
          user: editUser
        })
      case(DELETE_USER):
        const deleteUser = state.users.filter(c=>(action.payload !== c.userid))
        return({
          ...state,
          users: deleteUser
        })
      
      default:
        return state;
    }
  };