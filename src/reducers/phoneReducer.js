// filler file to help Github confirm file structures

import { 
    FETCH_START, 
    FETCH_SUCCESS, 
    FETCH_FAIL
     } from '../actions/Actions';
import { CREATE_PHONE, DELETE_PHONE, EDIT_PHONE } from '../actions/phoneActions';
    
    const initialState = {
        phone: {
            phoneid:0,
            phone:''
          },
        phones: [],
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
            phones: action.payload,
            isFetching: false
          })
        case(FETCH_FAIL):
          return({
            ...state,
            error: action.payload,
            isFetching: false
          })
        case(UPDATE_PHONE):
            return({
            ...state,
            phones: action.payload
        })
        case(EDIT_PHONE):
          const editPhone = state.item.find((c) => c.phoneid === action.payload);
          return({
            ...state,
            phones: editPhone,
          })
        case(DELETE_PHONE):
          const deletePhone = state.phone.filter(c=>(action.payload !== c.phoneid))
          return({
            ...state,
            phones: deletePhone,
          })
        case(ADD_PHONE):
          return({
            ...state,
            phones: [...state.phone, action.payload]
          })
        case(CREATE_PHONE):
          return({
            ...state,
            phones: action.payload
          })
        default:
          return state;
      }
    };