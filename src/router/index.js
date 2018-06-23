import React, { Component } from 'react';
import {Route, Switch, Redirect, HashRouter} from 'react-router-dom';
import {routes ,loyoutRouterMap ,otherRouterMap} from './config';
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

    componentDidMount(){
        console.log()
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <Route render={(location,history) => {
                        return (
                            <div style={{width:'100%',height:'100%'}}>
                                <Route render={ props => {
                                    return <App {...props} >
                                            <Route render={() => {
                                                
                                                return (
                                                    <Switch>
                                                        {loyoutRouter}
                                                        <Redirect from="*" to="/cart" />
                                                    </Switch>
                                                )
                                            }}/>
                                    </App >
                                }} />
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