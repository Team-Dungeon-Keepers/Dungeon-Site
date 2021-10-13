import { combineReducers } from 'redux';
import { AddressReducer } from './AddressReducer'
import { GameReducer } from './GameReducer'
import { LanguageReducer } from './languageReducer'
import { PhoneReducer } from './phoneReducer'
import { RuleReducer } from './RuleReducer'
import { ScheduleReducer } from './ScheduleReducer'
import { userReducer } from './UserReducer'

export const primeReducer = combineReducers({
    address: AddressReducer,
    game: GameReducer,
    lang: LanguageReducer,
    phone: PhoneReducer,
    rule: RuleReducer,
    schedule: ScheduleReducer,
    user: userReducer
})