import {  profileAPI, myContentAPI, commentsAPI } from "../api/api";

const SET_COMMENTS = 'SET_COMMENTS';
const SET_RECIPES = 'SET_RECIPES';
const SET_FIELDS = 'SET_FIELDS';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const SET_PROFILE = 'SET_PROFILE';
const SET_LOADING = 'SET_LOADING';

let initialState = {
    profile: {},
    comments: [],
    recipes: [],
    image: '',
    status: '',
    about: '',
    isLoading: true
};

export const profileReducer = (state = initialState, action) => {
    switch(action.type) {  
        case SET_COMMENTS:
            return {...state, comments: action.comments};
        case SET_RECIPES: 
            return {...state, recipes: action.recipes};
        case SET_PROFILE: 
            return {...state, profile: action.profile };
        case SET_FIELDS: 
            return {...state, [action.name] : action.value };
        case UPDATE_PROFILE:      
            if(action.profile.image != null) {
                action.profile.image = 'http://127.0.0.1:8000/storage/' + action.profile.image;
            }      
            return {...state, profile: action.profile }; 
        case SET_LOADING: 
            return {...state, isLoading : action.value }; 
        default:
           return state;
    }
};


const setComments = (comments) => ({type: SET_COMMENTS, comments});
const setRecipes = (recipes) => ({type: SET_RECIPES, recipes});
const setProfile = (profile) => ({type: SET_PROFILE, profile});
export const setFields = (name, value) => ({ type: SET_FIELDS, name, value});
const setUpdateProfile = (profile) => ({type: UPDATE_PROFILE, profile});
const setLoading = (value) => ({type: SET_LOADING, value});

export const getProfile = (id) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let response = await profileAPI.requestProfile(id);
        if(response.status === 200) {
            dispatch(setProfile(response.data));
            
        }
    };
};

export const requestProfileComments = (recipeId) => {
    return async (dispatch) => {
        let response = await commentsAPI.requestComments(recipeId);
        if(response.status === 200) {
            dispatch(setComments(response.data));
        }
    };
};

export const requestProfileRecipes = (userId) => {
    return async (dispatch) => {
        let response = await myContentAPI.requestMyRecipes(userId);
        if(response.status === 200) {
            dispatch(setRecipes(response.data));
            dispatch(setLoading(false));
        }
    };
};

export const updateProfile = (id, body) => {
    return async (dispatch) => {
        let response = await profileAPI.updateProfile(id, body);
        if(response.status === 200) {
            dispatch(setUpdateProfile(response.data.profile));
        }
    };
};


export const deleteProfile = (id) => {
    return async (dispatch) => {
        await profileAPI.deleteProfile(id);
    };
};





