import React, { Component } from 'react';
import MyContent from './MyContent';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {requestMyComments, requestMyRecipes, deleteRecipe, deleteComment, setFields, updateRecipe, updateComment} from './../../redux/mycontent-reducer';
import Preloader from '../Preloader/Preloader';

class MyContentContainer extends Component {
  componentDidMount() {
    this.props.requestMyRecipes(localStorage.userId);
    this.props.requestMyComments(localStorage.userId);
  }

  render() {
    return (
      <> 
      {
        this.props.isLoading 
        ? <Preloader />
        : <MyContent {...this.props} />
      }
      </>
    );
  }
}

let mapStateToProps = (state) => ({
    recipes: state.myContentPage.recipes,
    comments: state.myContentPage.comments,
    title: state.myContentPage.title,
    image: state.myContentPage.image,
    ingredients: state.myContentPage.ingredients,
    description: state.myContentPage.description,
    text: state.myContentPage.text,
    isLoading: state.myContentPage.isLoading
});
  
export default compose(
  connect(mapStateToProps, { requestMyComments, requestMyRecipes, deleteRecipe, deleteComment, setFields, updateRecipe, updateComment }),
  withRouter
)(MyContentContainer);