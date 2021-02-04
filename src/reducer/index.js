import { combineReducers } from 'redux';
import Braces2TeethReducer from './Braces2TeethReducer'
var RootReducer = combineReducers({
    braces2teeth: Braces2TeethReducer,
});


export default RootReducer;