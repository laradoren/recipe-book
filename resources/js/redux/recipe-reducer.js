import { recipesAPI } from "../api/api";

const SET_RECIPES = 'SET_RECIPES';
const CREATE_RECIPE = 'CREATE_RECIPE';
const SET_FIELDS = 'SET_FIELDS';
const GET_RECIPE = 'GET_RECIPE';
const SET_LIKES = 'SET_LIKES';
const SET_LOADING = 'SET_LOADING';

let initialState = {
    recipes: [],
    title: '',
    image: '',
    ingredients: '',
    description: '',
    recipe: {},
    likes: 0,
    isLoading: true
};

export const recipeReducer = (state = initialState, action) => {
    switch(action.type) {  
        case SET_RECIPES:
            return {...state, recipes: action.recipes};
        case CREATE_RECIPE:
            action.recipe.image = 'http://127.0.0.1:8000/storage/' + action.recipe.image; 
            return {...state, recipes: [action.recipe, ...state.recipes ]};
        case SET_FIELDS: 
            return {...state, [action.name]: action.value };
        case GET_RECIPE: 
            return {...state, recipe: action.recipe };
        case SET_LIKES:
            return {...state, likes: action.likes};
        case SET_LOADING:
            return {...state, isLoading: action.value};
        default:
           return state;
    }
};


const setRecipes = (recipes) => ({type: SET_RECIPES, recipes});
const createRecipe = (recipe) => ({type: CREATE_RECIPE, recipe});
export const setFields = (name, value) => ({ type: SET_FIELDS, name, value});
const getRecipe = (recipe) => ({type: GET_RECIPE, recipe});
const setLikes = (likes) => ({type: SET_LIKES, likes});
const setLoading = (value) => ({type: SET_LOADING, value});


export const requestRecipes = () => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let response = await recipesAPI.requestRecipes();
        if(response.status == 200) {
            dispatch(setRecipes(response.data));
            dispatch(setLoading(false));
        }
    };
};

export const addNewRecipe = (formData) => {
    return async (dispatch) => {
        let response = await recipesAPI.createRecipe(formData);
        if(response.status == 200) {
            dispatch(createRecipe(response.data));
        }
    };
};

export const showRecipe = (id) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let response = await recipesAPI.getRecipe(id);
        if(response.status == 200) {
            dispatch(getRecipe(response.data));
            dispatch(setLoading(false));
        }
    };
};

export const getLike = (id) => {
    return async (dispatch) => {
        let response = await recipesAPI.getLike(id);
        if(response.status == 200) {
            dispatch(setLikes(response.data.likes));
        }
    };
};

export const postLike = (recipeId, userId) => {
    return async (dispatch) => {
        let response = await recipesAPI.postLike(recipeId, userId);
        if(response.status == 200) {
            dispatch(setLikes(response.data.likes));
        }
    };
};







