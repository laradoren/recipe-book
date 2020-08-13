import React, { Component } from 'react';
import AddNew from './AddNew';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {setFields, addNewRecipe} from '../../redux/recipe-reducer';

class AddNewContainer extends Component {
  render() {
    return (
      <AddNew {...this.props}/>
    );
  }
}

let mapStateToProps = (state) => ({
    title: state.recipePage.title,
    image:  state.recipePage.image,
    ingredients:  state.recipePage.ingredients,
    description:  state.recipePage.description
});
  
export default compose(
  connect(mapStateToProps, { setFields, addNewRecipe }),
  withRouter
)(AddNewContainer);