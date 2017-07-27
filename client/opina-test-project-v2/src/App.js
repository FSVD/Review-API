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
      <div>
        <Link to="/" className="navbar">Test project</Link>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
