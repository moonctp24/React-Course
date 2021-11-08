import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'; // 브라우저가 컴포넌트인 것을 알게된다?

import './index.css';
import App from './App';

ReactDOM.render(
    // non-standard 컴포넌트, non-HTML 컴포넌트를 wrap
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);
