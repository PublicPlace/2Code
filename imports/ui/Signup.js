import React from 'react';
import { Link } from 'react-router';

import { Accounts } from 'meteor/accounts-base'; // /… because its Atmoshere package

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit (e){
    e.preventDefault();

    // old style e.target.email.value
    // using meteor refs
    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if (password.length < 3) {
      return this.setState({error: 'Password must be at least 8 characters long'});
    }

    //ES6 shortcut

    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error:err.reason});
      } else {
        this.setState({error: ''});
      }
    });
    // Accounts.createUser({
    //   email:'',
    //   password: ''.
    //   (err) => {
    //
    //   }
    // })
    // this.setState({
    //   error: 'Dumm gelaufen'
    // });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate /* jsx != novalidate in html5 */className="boxed-view__form">
            <input type="email" ref='email' name="email" /* autocomplete in browsers */ placeholder="Email"/>
            <input type="password" ref='password' name="password" /* autocomplete in browsers */ placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>
          <Link to="/">
            Allready have an account?
          </Link>
        </div>
      </div>
    );<p>Signup component here</p>;
  }
}
