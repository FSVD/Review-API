import React, { Component } from 'react';

export default class Login extends Component {
  signIn() {
    return (<span>Sign in</span>)
  }

  signUp() {
    return (<span>Sign up</span>)
  }

  render() {
    return (
      <div className="App-login"> {this.signIn()} | {this.signUp()} </div>
    )
  }
}
