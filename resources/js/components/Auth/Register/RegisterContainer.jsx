import React, { Component } from 'react';
import Register from './Register';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {register, setFields} from '../../../redux/auth-reducer';

class RegisterContainer extends Component {
  render() {
    return (
      <Register {...this.props} />
    );
  }
}

let mapStateToProps = (state) => ({
    name: state.authPage.name,
    email: state.authPage.email,
    password: state.authPage.password,
    isSuccessRegister: state.authPage.isSuccessRegister
});
  
export default compose(
  connect(mapStateToProps, {register, setFields}),
  withRouter
)(RegisterContainer);