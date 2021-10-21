import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import {FETCH_START, FETCH_FAIL, fetchStart} from './Actions';
//import fetchStart from 'Actions';
export const EDIT_ADDRESS = 'EDIT_ADDRESS';
export const DELETE_ADDRESS = "DELETE_ADDRESS";
export const ADD_ADDRESS = "ADD_ADDRESS";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const CREATE_ADDRESS = "CREATE_ADDRESS";
export const GET_ADDRESS_BY_ID = "GET_ADDRESS_BY_ID";
export const ADD_SINGLE_ADDRESS = "ADD_SINGLE_ADDRESS";

export const getAddresses = () => {
  return (dispatch => {
    dispatch(fetchStart());
    axiosWithAuth().get('/addresses')
    .then(res=> {
      dispatch({type: ADD_ADDRESS, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const getAddressByID = (addressesid) => {
  return (dispatch => {
    //dispatch({type: FETCH_START});
    
    dispatch(fetchStart());
    axiosWithAuth().get(`/address/${addressesid}`)
    .then(res=> {
      dispatch({type: DELETE_ADDRESS, payload: addressesid});
      dispatch({type: ADD_SINGLE_ADDRESS, payload:res.data});
    })
    .catch(err=>{
      dispatch({type: FETCH_FAIL, payload:err});
    })
  });
}

export const createAddress = (item) => {
    return (dispatch => {
      dispatch(fetchStart());
      axios
      .post('https://dungeon-site-api/api/address/', item)
      .then((res) => {
        dispatch(addAddress(res.data))
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

  export const editAddress = (editedAddress) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .put('https://dungeon-site-api/api/address/', editedAddress)
      .then((res) => {
        dispatch({type: DELETE_ADDRESS, payload: editedAddress.addressesid});
        dispatch({type: ADD_SINGLE_ADDRESS, payload:res.data});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
  };
  
  
  export const deleteAddress = (addressesid) => {
    return (dispatch => {
      dispatch(fetchStart());

      axios
      .delete('https://dungeon-site-api/api/address/', addressesid)
      .then((res) => {
        dispatch({type: DELETE_ADDRESS, payload: addressesid});
      })
      .catch((err) => {
        dispatch({type: FETCH_FAIL, payload:err});
        console.log('ERROR', err);
      });
    })
 }

  export const addAddress = a => {
    return ({type:ADD_ADDRESS, payload:a})
  }