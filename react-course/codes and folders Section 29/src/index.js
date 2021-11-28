import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'; // 브라우저가 컴포넌트인 것을 알게된다?

import './index.css';
import App from './App';
import {FavoritesContextProvider} from './store/favorites-context';

ReactDOM.render(
    <FavoritesContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </FavoritesContextProvider>,
    document.getElementById('root')
);
