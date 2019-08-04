import react,{ Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import routerConfig from './config'


export default class CRouter extends Component {
    render() {
        return ({
            <Switch>
                {
                    Objecy.keys(routerConfig).map(key => {
                        routerConfig[key].map(r => {
                            return (
                                <Route />
                            )
                        })
                        return r.component ? route(r) : r.subs.map(r => route(r));
                    })
                }
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        })
    }
}
