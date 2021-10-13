// filler file to help Github confirm file structures

import { 
  EDIT_CLASS, 
  FETCH_START, 
  FETCH_SUCCESS, 
  FETCH_FAIL, 
  DELETE_CLASS,
  ADD_CLASS,
  ADD_USER } from '../actions/Actions';
  
  const initialState = {
    user: {
      username:'',
      password:'',
      role:'',
      skip: false
    },
    classes: [],
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
      case(FETCH_SUCCESS):
        return({
          ...state,
          classes: action.payload,
          isFetching: false
        })
      case(FETCH_FAIL):
        return({
          ...state,
          error: action.payload,
          isFetching: false
        })
      case(EDIT_CLASS):
        const editClass = state.item.find((c) => c.id === action.payload);
        return({
          ...state,
          classes: editClass,
        })
      case(DELETE_CLASS):
        const deleteClass = state.classes.filter(c=>(action.payload !== c.id))
        return({
          ...state,
          classes: deleteClass
        })
      case(ADD_CLASS):
        return({
          ...state,
          classes: [...state.classes, action.payload]
        })
      case(ADD_USER):
        return({
          ...state,
          user: action.payload
        })

      default:
        return state;
    }
  };