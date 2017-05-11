import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { Tracker } from 'meteor/tracker';
import { Sessions } from 'meteor/session';


import {routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !! Meteor.userId();
  onAuthChange(isAuthenticated)
});

// Tracker.autorun(() => {
//   const name = Session.get('name');
//   console.log(name);
// });
// Session.set('name', 'Michael');
// // Stateless functional component
// import React from 'react';
// const MyComponent = (props) => {
//   return (
//     <div>
//       <h1>Stateless functional component {props.name}</h1>
//     </div>
//   );    
// };

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
  // ReactDOM.render(<MyComponent name='Mike'/>, document.getElementById('app'));
});
