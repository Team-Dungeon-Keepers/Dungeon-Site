// filler file to help Github confirm file structures

import { 
  FETCH_START, 
  FETCH_FAIL, 
  } from '../actions/Actions';

import {
  ADD_ADDRESS,
  ADD_SINGLE_ADDRESS,
  DELETE_ADDRESS,
  EDIT_ADDRESS
} from '../actions/AddressActions';
  
  const initialState = {
    address: {
      addressesid: 0,
      addressesstreet: '',
      addressesapartment: '',
      addressescity: '',
      addressesstate: '',
      addresseszip: 0
    },
    addresses: [],
    isFetching: false,
    error: ''
  };
  
  export const AddressReducer = (state = initialState, action) => {
    switch (action.type) {
      case(FETCH_START):
        return({
          ...state,
          isFetching: true
        })
      case(ADD_ADDRESS):
        return({
          ...state,
          addresses: action.payload,
          isFetching: false
        })
      case(ADD_SINGLE_ADDRESS):
        return ({
          ...state,
          addresses: [...state.addresses, action.payload]
        })
      case(FETCH_FAIL):
        return({
          ...state,
          error: action.payload,
          isFetching: false
        })
      case(EDIT_ADDRESS):
        const editAddress = state.addresses.find((c) => c.addressesid === action.payload);
        return({
          ...state,
          address: editAddress,
        })
      case(DELETE_ADDRESS):
        const deleteAddress = state.classes.filter(c=>(action.payload !== c.addressesid))
        return({
          ...state,
          addresses: deleteAddress
        })
      
      default:
        return state;
    }
  };