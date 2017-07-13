import React, { Component } from 'react';
import './App.css';
import SubjectsListWithData from './components/SubjecListWithData';

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
        <div className="App">
          <div className="navbar">Test project</div>
          <br></br>
          <SubjectsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
