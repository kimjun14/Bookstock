// src/redux/store.js

import { createStore } from 'redux';
import rootReducer from './reducers'; // 수정된 import 문

// 스토어 생성
const store = createStore(rootReducer);

export default store;