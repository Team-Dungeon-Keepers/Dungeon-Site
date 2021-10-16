// filler file to help Github confirm file structures

import { 
  FETCH_START, 
  FETCH_FAIL, 
  } from '../actions/Actions';

import {
  ADD_LINKS,
  ADD_SINGLE_LINK,
  DELETE_LINK,
  EDIT_LINK
} from '../actions/linkActions';
  
  const initialState = {
    link: {
      linkid: 0,
      url: '',
      description: ''
    },
    links: [],
    isFetching: false,
    error: ''
  };
  
  export const linkReducer = (state = initialState, action) => {
    switch (action.type) {
      case(FETCH_START):
        return({
          ...state,
          isFetching: true
        })
      case(ADD_LINKS):
        return({
          ...state,
          links: action.payload,
          isFetching: false
        })
      case(ADD_SINGLE_LINK):
        return ({
          ...state,
          links: [...state.links, action.payload]
        })
      case(FETCH_FAIL):
        return({
          ...state,
          error: action.payload,
          isFetching: false
        })
      case(EDIT_LINK):
        const editLink = state.links.find((c) => c.linkid === action.payload);
        return({
          ...state,
          link: editLink
        })
      case(DELETE_LINK):
        const deleteLink = state.links.filter(c=>(action.payload !== c.linkid))
        return({
          ...state,
          links: deleteLink
        })
      
      default:
        return state;
    }
  };