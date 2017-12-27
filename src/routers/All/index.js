import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import store from '../Home/store'
import { observer } from 'mobx-react';
@observer
export default class All extends Component<{}> {
    render() {
        const {homeStore} = store
        const text = `这是从home组件中取过来的store：“${homeStore}”`
        return (
            <View>
                <Text>
                    {text}
                </Text>
            </View>
        );
    }
}