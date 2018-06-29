import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ajaxGet,ajaxPost} from './api/axios'

import App from './views/Main';
import registerServiceWorker from './registerServiceWorker';

React.ajaxGet = ajaxGet;
React.ajaxPost = ajaxPost;
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
            // $('#onProcess').hide();
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
