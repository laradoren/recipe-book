import React, { Component } from 'react';
import Header from './Header';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {setToken} from './../../redux/auth-reducer';

class HeaderContainer extends Component {
    componentDidMount() {
        this.props.setToken( localStorage.userToken ? localStorage.userToken : null);
    }
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

let mapStateToProps = (state) => ({
    token: state.authPage.token
});
  
export default compose(
  connect(mapStateToProps, {setToken}),
  withRouter
)(HeaderContainer);