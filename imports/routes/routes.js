import { Meteor } from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

//TESTING //
window.browserHistory = browserHistory;

// logged in
// blank Pages
// google.com
// localhost:3000
// localhost:3000/links > back > localhost:3000 and not google.com
// PROBLEM: Adding links to browser stack
// SOLUTION: better to replace browser history


// Pages a visitor should not see if authenticated
const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
  if(Meteor.userId())
  {
    browserHistory.replace('/links')
  }
};
const onEnterPrivatePage = () => {
  if(!Meteor.userId())
  {
    browserHistory.replace('/')
  }
};
export const onAuthChange = (isAuthenticated) => {
  const pathName = browserHistory.getCurrentLocation().pathname;

  const isUnauthenticadedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticadedPage = authenticatedPages.includes(pathName);

  if (isAuthenticated && isUnauthenticadedPage) {
    browserHistory.replace('/links');
  }
  else if (!isAuthenticated && isAuthenticadedPage) {
    browserHistory.replace('/');
  }
  console.log('isAuthenticated', isAuthenticated);
}
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
