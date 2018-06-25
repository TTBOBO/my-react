import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ajaxGet,ajaxPost} from './api/axios'

import App from './views/Main';
import registerServiceWorker from './registerServiceWorker';

React.ajaxGet = ajaxGet;
React.ajaxPost = ajaxPost;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
