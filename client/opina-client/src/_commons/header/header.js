import React, { Component } from 'react';
import Login from '../login/login'
import logo from '../../logo.svg';
import './header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Login />
      </div>
    )
  }
}
