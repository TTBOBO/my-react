import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { loyoutRouterMap, otherRouterMap } from './config';
import App from '../App';

const renderRouteComponent = routes => routes.map((route, index) => {
    return <Route key={index} {...route} />
})

const loyoutRouter = renderRouteComponent(loyoutRouterMap);
const otherRouter = renderRouteComponent(otherRouterMap);

class index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <HashRouter>
                    <Route render={(location, history) => {
                        return (
                            <div style={{ width: '100%', height: '100%' }}>
                                <Switch>
                                    {otherRouter}
                                    <Route render={props => {
                                        return <App {...props} >
                                            <Route render={() => {
                                                return (
                                                    <Switch>
                                                        {loyoutRouter}
                                                        <Redirect from="*" to="/" />
                                                    </Switch>
                                                )
                                            }} />
                                        </App >
                                    }} />
                                </Switch>
                            </div>
                        )
                    }}>

                    </Route>
                </HashRouter>
            </div>
        );
    }
}



export default index;