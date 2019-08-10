/*
 * @Description: input file
 * @Author: ganbowen
 * @Date: 2019-07-09 20:06:46
 * @LastEditTime: 2019-08-10 15:51:08
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './Page'
import * as serviceWorker from './serviceWorker';
import './assets/style/index.scss'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(<Provider store={store}>
    <Page />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();