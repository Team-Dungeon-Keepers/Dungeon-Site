export const ADD_LANG = "ADD_LANG";

export const createLang = language => {
    return {type: ADD_LANG, payload: language}
  }