import { combineReducers } from 'redux';
import { ruleReducer } from "./RuleReducer";
import languageReducer from "./LanguageReducer";
import gameReducer from "./GameReducer";

const primeReducer = combineReducers({
    rules: ruleReducer,
    languages: languageReducer,
    games: gameReducer
})

export default primeReducer