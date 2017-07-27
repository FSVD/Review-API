import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

import NotFound from './components/NotFound';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/" className="navbar">Test project</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
