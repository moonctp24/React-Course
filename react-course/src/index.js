import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthContextProvier } from './store/auth-context';

ReactDOM.render(
  <AuthContextProvier>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </AuthContextProvier>,
  document.getElementById('root')
);
