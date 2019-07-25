import { combineReducers } from 'redux';
import mapReducer from '../Reducers/Map';

export const root = combineReducers({
    Map: mapReducer
})