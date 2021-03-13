import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.js';

import { Provider } from 'react-redux'; // Redux
import store from './components/redux/index.js';

ReactDOM.render( <Provider store={store}><App></App></Provider>, document.getElementById('root'));



