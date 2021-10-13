// filler file to help Github confirm file structures

import { 
    EDIT_CLASS, 
    FETCH_START, 
    FETCH_SUCCESS, 
    FETCH_FAIL,
    ADD_LANG, 
     } from '../actions/Actions';
import { CREATE_LANG, DELETE_LANG, EDIT_LANG } from '../actions/LanguageActions';
    
    const initialState = {
        language: {
            languageid:0,
            language:''
          },
        languages: [],
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
        case(UPDATE_LANG):
            return({
            ...state,
            language: action.payload
        })
        case(EDIT_LANG):
          const editLang = state.item.find((c) => c.id === action.payload);
          return({
            ...state,
            language: editLang,
          })
        case(DELETE_LANG):
          const deleteLang = state.classes.filter(c=>(action.payload !== c.id))
          return({
            ...state,
            classes: deleteClass
          })
        case(ADD_LANG):
          return({
            ...state,
            classes: [...state.classes, action.payload]
          })
        case(CREATE_LANG):
          return({
            ...state,
            user: action.payload
          })
        default:
          return state;
      }
    };