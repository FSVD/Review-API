import React, { Component } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import SubjectsListWithData from './components/SubjecListWithData';
import NotFound from './components/NotFound';
import SubjectDetails from './components/SubjectDetails';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

const networkInterface = createNetworkInterface({ uri: 'http://127.0.0.1:4001/graphql', })

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 1000);
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">Test project</Link>
            <br></br>
            <Switch>
              <Route exact path="/" component={SubjectsListWithData}/>
              <Route path="/subject/:subjectId" component={SubjectDetails}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
