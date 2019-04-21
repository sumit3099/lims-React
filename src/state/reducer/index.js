import {combineReducers} from 'redux';
import BbooksReducer from './bbooksReducer';
import WbooksReducer from './wbooksReducer';
import BooksReducer from './booksReducer'
import ReviewReducer from './reviewReducer';


//   We combine all reducers into a single object before updated data is dispatched (sent) to store
//   Your entire applications state (store) is just whatever gets returned from all your reducers
 

const allReducers = combineReducers({
    bbooks: BbooksReducer,
    books: BooksReducer,
    wbooks:WbooksReducer,
    reviews:ReviewReducer
});

export default allReducers