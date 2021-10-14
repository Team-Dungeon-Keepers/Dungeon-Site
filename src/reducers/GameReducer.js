// filler file to help Github confirm file structures

import { 
    FETCH_START, 
    FETCH_SUCCESS, 
    FETCH_FAIL
     } from '../actions/Actions';
     
import { ADD_GAMES, CREATE_GAME, DELETE_GAME, EDIT_GAME, UPDATE_GAME, ADD_SINGLE_GAME } from '../actions/GameAction';

    
    const initialState = {
        game: {
            gameid:0,
            rulesid:0,
            gamename:'',
            gamepassword:'',
            gamemasterid:0,
            description:''
          },
        games: [],
        isFetching: false,
        error: ''
      
    };
    
    export const GameReducer = (state = initialState, action) => {
      switch (action.type) {
        case(FETCH_START):
          return({
            ...state,
            isFetching: true
          })
        case(FETCH_SUCCESS):
          return({
            ...state,
            games: action.payload,
            isFetching: false
          })
        case(FETCH_FAIL):
          return({
            ...state,
            error: action.payload,
            isFetching: false
          })
        case(UPDATE_GAME):
            return({
            ...state,
            games: action.payload
        })
        case(EDIT_GAME):
          const editGame = state.item.find((c) => c.gameid === action.payload);
          return({
            ...state,
            games: editGame,
          })
        case(DELETE_GAME):
          const deleteGame = state.game.filter(c=>(action.payload !== c.gameid))
          return({
            ...state,
            games: deleteGame,
          })
        case(ADD_GAMES):
          return({
            ...state,
            games: [...state.game, action.payload]
          })
          case(ADD_SINGLE_GAME):
          return ({
            ...state,
            games: [...state.games, action.payload]
          })
        case(CREATE_GAME):
          return({
            ...state,
            games: action.payload
          })
        default:
          return state;
      }
    };
    export default GameReducer;