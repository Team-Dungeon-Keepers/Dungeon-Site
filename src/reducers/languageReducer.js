// filler file to help Github confirm file structures

import { FETCH_START, FETCH_SUCCESS, FETCH_FAIL } from '../actions/Actions';
import { ADD_LANGS, ADD_SINGLE_LANG, CREATE_LANG, DELETE_LANG, EDIT_LANG, UPDATE_LANG } from '../actions/LanguageActions';
    
    const initialState = {
        language: {
            languageid:0,
            language:''
          },
        languages: [],
        isFetching: false,
        error: ''
      
    };
    
    export const languageReducer = (state = initialState, action) => {
      switch (action.type) {
        case(FETCH_START):
          return({
            ...state,
            isFetching: true
          })
        case(FETCH_SUCCESS):
          return({
            ...state,
            languages: action.payload,
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
            languages: action.payload
        })
        case(EDIT_LANG):
          const editLang = state.item.find((c) => c.languageid === action.payload);
          return({
            ...state,
            languages: editLang,
          })
        case(DELETE_LANG):
          const deleteLang = state.language.filter(c=>(action.payload !== c.languageid))
          return({
            ...state,
            languages: deleteLang,
          })
        case(ADD_LANGS):
          return({
            ...state,
            languages: [...state.language, action.payload]
          })
          case(ADD_SINGLE_LANG):
          return ({
            ...state,
            languages: [...state.languages, action.payload]
          })
        case(CREATE_LANG):
          return({
            ...state,
            languages: action.payload
          })
        default:
          return state;
      }
    };
    export default languageReducer;