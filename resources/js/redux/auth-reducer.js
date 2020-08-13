import { authAPI } from "../api/api";

const SET_FIELDS = 'SET_FIELDS';
const SET_SUCCESS_LOGIN = 'SET_SUCCESS_LOGIN';
const SET_SUCCESS_REGISTER = 'SET_SUCCESS_REGISTER';
const SET_TOKEN = 'SET_TOKEN';


let initialState = {
    name: '',
    email: '',
    password: '',
    isSuccessLogin: false,
    isSuccessRegister: false,
    token: null
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {  
        case SET_SUCCESS_LOGIN: 
            return {...state, isSuccessLogin: action.value };       
        case SET_SUCCESS_REGISTER: 
            return {...state, isSuccessRegister: action.value };
        case SET_FIELDS: 
            return {...state, [action.name]: action.value };
        case SET_TOKEN: 
            return {...state, token: action.token };
        default:
            return state;
    }
};

export const setFields = (name, value) => ({ type: SET_FIELDS, name, value});
const setSuccessLogin = (value) => ({ type: SET_SUCCESS_LOGIN, value});
const setSuccessRegister = (value) => ({ type: SET_SUCCESS_REGISTER, value});
export const setToken = (token) => ({ type: SET_TOKEN, token});


export const register = (formData) => {
    return async (dispatch) => {
        dispatch(setSuccessRegister(false));
        let response = await authAPI.register(formData); 
        if(response.status == 200) {
            dispatch(setSuccessRegister(response.data.success));
        }
    }; 
};

export const login = (formData) => {
    return async (dispatch) => {
        dispatch(setSuccessLogin(false));
        let response = await authAPI.login(formData); 
        if(response.data.success) { 
            localStorage.setItem('userToken', response.data.token);
            dispatch(setToken(response.data.token));
            localStorage.setItem('userId', response.data.id);  
            localStorage.setItem('userName', response.data.name);
            dispatch(setSuccessLogin(response.data.success));
        }         
    }; 
};


