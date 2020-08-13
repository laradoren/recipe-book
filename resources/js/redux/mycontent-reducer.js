import {  myContentAPI } from "../api/api";

const SET_COMMENTS = 'SET_COMMENTS';
const SET_RECIPES = 'SET_RECIPES';
const SET_FIELDS = 'SET_FIELDS';
const DELETE_RECIPE = 'DELETE_RECIPE';
const DELETE_COMMENT = 'DELETE_COMMENT';
const UPDATE_RECIPE = 'UPDATE_RECIPE';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const SET_LOADING = 'SET_LOADING';

let initialState = {
    comments: [],
    recipes: [],
    title: '',
    image: '',
    ingredients: '',
    description: '',
    text: '',
    isLoading: true    
};

export const myContentReducer = (state = initialState, action) => {
    switch(action.type) {  
        case SET_LOADING:
            return {...state, isLoading: action.value};
        case SET_COMMENTS:
            return {...state, comments: action.comments};
        case SET_RECIPES: 
            return {...state, recipes: action.recipes};
        case SET_FIELDS: 
            return {...state, [action.name] : action.value };
        case DELETE_RECIPE: 
            return {...state,  comments: state.comments.filter(c => c.recipe !== action.id ) , recipes: state.recipes.filter(r => r.id !== action.id )};
        case DELETE_COMMENT: 
            return {...state, comments: state.comments.filter(c => c.id !== action.id )};
        case UPDATE_RECIPE: 
            let newRecipes = state.recipes.map( s => {
                if(s.id == action.id) {
                    action.recipe.image = 'http://127.0.0.1:8000/storage/' + action.recipe.image; 
                    return action.recipe;
                }  else {                   
                    return s;
                }  
            });            
            return {...state, recipes: newRecipes };
        case UPDATE_COMMENT: 
            let newComments = state.comments.map( s => {
                if(s.id == action.id) { 
                    return action.comment;
                }  else {                   
                    return s;
                }  
            });            
            return {...state, comments: newComments };
        default:
           return state;
    }
};


const setComments = (comments) => ({type: SET_COMMENTS, comments});
const setRecipes = (recipes) => ({type: SET_RECIPES, recipes});
export const setFields = (name, value) => ({ type: SET_FIELDS, name, value});
const setDeleteRecipe = (id) => ({type: DELETE_RECIPE, id});
const setDeleteComment = (id) => ({type: DELETE_COMMENT, id});
const setUpdateRecipe = (id, recipe) => ({type: UPDATE_RECIPE, id, recipe});
const setUpdateComment = (id, comment) => ({type: UPDATE_COMMENT, id, comment});
const setLoading = (value) => ({type: SET_LOADING, value});

export const requestMyComments = (userId) => {
    return async (dispatch) => {
        let response = await myContentAPI.requestMyComments(userId);
        if(response.status === 200) {
            dispatch(setComments(response.data));
            dispatch(setLoading(false));
        }
    };
};

export const requestMyRecipes = (userId) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let response = await myContentAPI.requestMyRecipes(userId);
        if(response.status === 200) {
            dispatch(setRecipes(response.data));
        }
    };
};

export const deleteRecipe = (id) => {
    return async (dispatch) => {
        let response = await myContentAPI.deleteRecipe(id);
        if(response.status === 200) {
            dispatch(setDeleteRecipe(id));
        }
    };
};

export const deleteComment = (id) => {
    return async (dispatch) => {
        let response = await myContentAPI.deleteComment(id);
        if(response.status === 200) {
            dispatch(setDeleteComment(id));
        }
    };
};

export const updateRecipe = (id, body) => {
    return async (dispatch) => {
        let response = await myContentAPI.updateRecipe(id, body);
        if(response.status === 200) {
            dispatch(setUpdateRecipe(id, response.data.recipe));
        }
    };
};

export const updateComment = (id, body) => {
    return async (dispatch) => {
        let response = await myContentAPI.updateComment(id, body);
        if(response.status === 200) {
            dispatch(setUpdateComment(id, response.data.comment));
        }
    };
};


