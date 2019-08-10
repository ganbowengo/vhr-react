/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-04 14:48:58
 * @LastEditTime: 2019-08-04 14:48:58
 * @LastEditors: your name
 */
import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import App from './App';

export default () => (
    <Router>
        <Switch>
            <Router exact path="/" render={() => <Redirect to="/login" push />} />        
            <Route path="/app" component={App} />
            <Route path="/login" component={Login} />
        </Switch>
    </Router>
)