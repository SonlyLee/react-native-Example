import {AppRegistry} from 'react-native';
import {name as appName} from '../app.json';
import React, { Component } from 'react';
import {Provider} from 'react-redux';
import App from './App'
import store from './store'


export default class AppIndex extends Component{
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => AppIndex);