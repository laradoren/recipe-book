import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './../redux/redux-store';
import { Provider } from 'react-redux';
import MainPageContainer from './MainPage/MainPageContainer';
import Footer from './Footer/Footer';
import MyContentContainer from './MyContent/MyContentContainer';
import RegisterContainer from './Auth/Register/RegisterContainer';
import LoginContainer from './Auth/Login/LoginContainer';
import AddNewContainer from './AddNew/AddNewContainer';
import ProfileContainer from './Profile/ProfileContainer';
import RecipeContainer from './Recipe/RecipeContainer';
import HeaderContainer from './Header/HeaderContainer';
import ScrollToTop from './common/ScrollToTop';

const App = () => {
    return (
        <div class = "mainPageBlock">
            <HeaderContainer />
            <Switch>
              <Route exact path = '/' component = { MainPageContainer } />
              <Route exact path = '/recipe/:recipeId?' component = { RecipeContainer } />

              <Route exact path = '/mycontent' component = {MyContentContainer} />
              <Route exact path = '/addnew' component = { AddNewContainer } />

              <Route exact path = '/login' component = {LoginContainer } />
              <Route exact path = '/register' component = { RegisterContainer} />

              <Route exact path = '/profile/:userId?' component = { ProfileContainer} />
            </Switch>
            <Footer />
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <BrowserRouter>
          <ScrollToTop />
          <Provider store = {store}>
            <App />
          </Provider>
        </BrowserRouter>, 
        document.getElementById('app')
      );
}
