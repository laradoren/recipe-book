import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Profile } from './Profile';
import {setFields, requestProfileComments, requestProfileRecipes, updateProfile, getProfile, deleteProfile} from './../../redux/profile-reducer';
import Preloader from '../Preloader/Preloader';

class ProfileContainer extends Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            this.props.history.push('/login');
        }
        this.props.getProfile(userId);
        this.props.requestProfileRecipes(userId);
    }

    componentDidMount() {
        this.refreshProfile();        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId != prevProps.match.params.userId)
          this.refreshProfile();
    }

    render() {
        return (
            <>
            {
                this.props.isLoading
                ? <Preloader />
                : <Profile {...this.props} />
            }
            </>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    comments: state.profilePage.comments,
    recipes: state.profilePage.recipes,
    image: state.profilePage.image,
    status: state.profilePage.status,
    about: state.profilePage.about,
    isLoading: state.profilePage.isLoading 
});
  
export default compose(
  connect(mapStateToProps, { setFields, requestProfileComments, requestProfileRecipes, updateProfile, getProfile, deleteProfile }),
  withRouter
)(ProfileContainer);