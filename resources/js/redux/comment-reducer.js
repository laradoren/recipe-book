import { commentsAPI } from "../api/api";

const SET_COMMENTS = 'SET_COMMENTS';
const CREATE_COMMENT = 'CREATE_COMMENT';
const SET_FIELDS = 'SET_FIELDS';
const SET_MY_COMMENTS = 'SET_MY_COMMENTS';

let initialState = {
    comments: [],
    text: '',
    myComments: []
};

export const commentReducer = (state = initialState, action) => {
    switch(action.type) {  
        case SET_COMMENTS:
            return {...state, comments: action.comments};
        case CREATE_COMMENT:
            return {...state, comments: [action.comment,  ...state.comments]};
        case SET_FIELDS: 
            return {...state, [action.name]: action.value };
        case SET_MY_COMMENTS:
            return {...state, myComments: action.myComments};
        default:
           return state;
    }
};


const setComments = (comments) => ({type: SET_COMMENTS, comments});
const createComment = (comment) => ({type: CREATE_COMMENT, comment});
export const setFields = (name, value) => ({ type: SET_FIELDS, name, value});
const setMyComments = (myComments) => ({type: SET_MY_COMMENTS, myComments});


export const requestComments = (recipeId) => {
    return async (dispatch) => {
        let response = await commentsAPI.requestComments(recipeId);
        if(response.status == 200) {
            dispatch(setComments(response.data));
        }
    };
};

export const addNewComment = (formData) => {
    return async (dispatch) => {
        let response = await commentsAPI.createComment(formData);
        if(response.status == 200) {
            dispatch(createComment(response.data));
        }
    };
};

export const showMyComments = (id) => {
    return async (dispatch) => {
        let response = await commentsAPI.getMyComments(id);
        if(response.status == 200) {
            dispatch(setMyComments(response.data));
        }
    };
};

