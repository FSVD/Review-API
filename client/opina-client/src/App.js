import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css';
import { HomeView } from './Home/home.view';
import ListView from './List/list.view';

const SEARCHER = 0;
const EXTENDEDSEARCHER = 1;

const routes = [
  { path: '/',
    exact: true,
    component: () => <HomeView searcher={SEARCHER} />
  },
  { path: '/extended',
    component: () => <HomeView searcher={EXTENDEDSEARCHER} />
  },
  { path: '/list',
    component: () => <ListView />
  }
]

const App = () => (
  <Router>
      <div>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </div>
  </Router>
)

export default App;
