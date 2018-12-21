import {shareReducer,rightOpenReducer,leftOpenReducer,directionReducer,collectionsReducer,requestResultReducer,onResult} from './reducer';
import {combineReducers} from 'redux';

const reducer = combineReducers({
    showSharePop: shareReducer,
    isOpen: rightOpenReducer,
    isOpenLeft: leftOpenReducer,
    direction: directionReducer,
    collections: collectionsReducer,
    result: requestResultReducer,
})

export default reducer;