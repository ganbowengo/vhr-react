import React from 'react'
import { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routerConfig from './config'
import Test from '../components/baseInfo/baseInfo'


export default class CRouter extends Component {
    render() {
        return (<Router>
            <Switch>
                <Route path="/app/emp/basic" component={Test} />
            </Switch>
        </Router>)
    }
}