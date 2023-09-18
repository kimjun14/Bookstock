import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // react-redux에서 Provider 가져오기
import store from './redux/store'; // Redux 스토어 가져오기
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


