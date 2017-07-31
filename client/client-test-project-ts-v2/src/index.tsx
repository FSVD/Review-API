import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App/components/App.component';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
