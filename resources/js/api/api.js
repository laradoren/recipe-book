import * as axios from 'axios';

const instance = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const recipesAPI = {
    requestRecipes() {        
        return instance.get(`recipes`);
    },
    getRecipe(id) {
        return instance.get(`recipes/${id}`);
    },
    createRecipe(formData) {
        return instance.post(`recipes`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },
    getLike(recipeId) {
        return instance.get(`likes/${recipeId}`);
    },
    postLike(recipeId, userId) {
        return instance.post(`likes/${recipeId}`, userId);
    }
}; 

export const commentsAPI = {
    requestComments(id) {        
        return instance.get(`comments/${id}`);
    },
    createComment(formData) {
        return instance.post(`comments`, formData);
    }
}; 

export const authAPI = {
    register(formDate) {
        return instance.post(`register`, formDate);
    },
    login(formDate) {
        return instance.post(`login`, formDate);
    }
};

export const myContentAPI = {
    requestMyComments(id) {
        return instance.get(`comments/my/${id}`);
    },
    requestMyRecipes(id) {
        return instance.get(`recipes/my/${id}`);
    },
    deleteRecipe(id) {
        return instance.delete(`recipes/${id}`);
    },
    updateRecipe(id, formDate) {
        return instance.post(`recipes/${id}`, formDate);
    },
    deleteComment(id) {
        return instance.delete(`comments/${id}`);
    },
    updateComment(id, formData) {
        return instance.post(`comments/${id}`, formData);
    }

};

export const profileAPI = {
    requestProfile(id) {
        return instance.get(`user/${id}`);
    },
    updateProfile(id, formDate) {
        return instance.post(`profile/${id}`, formDate);
    },
    deleteProfile(id) {
        return instance.delete(`profile/${id}`);
    }

};