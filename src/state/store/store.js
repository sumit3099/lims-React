import { createStore } from 'redux'
import searchReducer from '../reducer/searchReducer'

var store = createStore(searchReducer,
// applyMiddleware(logger,thunk)
);


export default store;