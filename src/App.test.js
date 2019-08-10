/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-09 20:06:46
 * @LastEditTime: 2019-08-10 15:50:28
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});