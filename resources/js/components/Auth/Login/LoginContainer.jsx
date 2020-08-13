import React, { Component } from 'react';
import Login from './Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {login, setFields} from '../../../redux/auth-reducer';

class LoginContainer extends Component {
  render() {
    return (
      <Login {...this.props} />
    );
  }
}

let mapStateToProps = (state) => ({
    email: state.authPage.email,
    password: state.authPage.password,
    isSuccessLogin: state.authPage.isSuccessLogin
});
  
export default compose(
  connect(mapStateToProps, {login, setFields}),
  withRouter
)(LoginContainer);