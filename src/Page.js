import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import App from './App';

export default () => (
    <Router>
        <Switch>
            <Router exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />        
            <Route path="/app" component={App} />
            <Route path="/login" component={Login} />
        </Switch>
    </Router>
)