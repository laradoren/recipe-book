import React, { Component } from 'react';
import MainPage from './MainPage';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {requestRecipes} from '../../redux/recipe-reducer';
import Preloader from '../Preloader/Preloader';

class MainPageContainer extends Component {
  componentDidMount() {
    this.props.requestRecipes();
  }

  render() {
    return (
      <> 
      { this.props.isLoading 
        ? <Preloader /> 
        : <MainPage recipes = {this.props.recipes} />
      }
      </>
      
    );
  }
}

let mapStateToProps = (state) => ({
    recipes: state.recipePage.recipes,
    isLoading: state.recipePage.isLoading
});
  
export default compose(
  connect(mapStateToProps, { requestRecipes }),
  withRouter
)(MainPageContainer);