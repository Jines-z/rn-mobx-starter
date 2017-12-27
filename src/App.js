import React, {Component} from 'react';
import { observer } from 'mobx-react';
import SplashScreen from 'rn-splash-screen';
import Provider from './provider'
import contextStore from './contextStore'
import Routers from './routers'

@observer
export default class App extends Component<{}> {
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);
    }
    render() {
        return (
            <Provider store={contextStore}>
                <Routers screenProps={{themeColor:'white'}}/>
            </Provider>
        );
    }
}