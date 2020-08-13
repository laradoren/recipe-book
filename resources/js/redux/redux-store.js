import { createStore, combineReducers, applyMiddleware, compose }  from 'redux';
import { recipeReducer } from './recipe-reducer';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './auth-reducer';
import { commentReducer } from './comment-reducer';
import { myContentReducer } from './mycontent-reducer';
import { profileReducer } from './profile-reducer';

let reducers = combineReducers({
    recipePage: recipeReducer,
    commentPage: commentReducer,
    authPage: authReducer,
    myContentPage: myContentReducer,
    profilePage: profileReducer 
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;


export default store;