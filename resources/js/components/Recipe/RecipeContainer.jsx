import React, { Component } from 'react';
import Recipe from './Recipe';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {showRecipe, postLike, getLike} from '../../redux/recipe-reducer';
import {requestComments, setFields, addNewComment } from '../../redux/comment-reducer';
import Preloader from '../Preloader/Preloader';

class RecipeContainer extends Component {
    componentDidMount() {
        let recipeId = this.props.match.params.recipeId;
        this.props.showRecipe(recipeId); 
        this.props.requestComments(recipeId); 
        this.props.getLike(recipeId); 
    }

    render() {
        return (
            <>
            { this.props.isLoading 
              ? <Preloader />
              : <Recipe {...this.props} />
            }
            </>
            
        );
    }
}

let mapStateToProps = (state) => ({
    recipe: state.recipePage.recipe,
    comments: state.commentPage.comments,
    text: state.commentPage.text,
    likes: state.recipePage.likes,
    isLoading: state.recipePage.isLoading
});
  
export default compose(
  connect(mapStateToProps, { showRecipe, requestComments, setFields, addNewComment, postLike, getLike }),
  withRouter
)(RecipeContainer);