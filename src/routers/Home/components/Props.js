import React, {Component, PropTypes} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
export default class Props extends Component<{}> {
    render() {
        const { homeStore,changeHomeStore,completedHomeStore } = this.props;
        return (
            <View>
                <Text>
                    {homeStore}
                </Text>
                <TouchableOpacity onPress={()=>changeHomeStore('11')}>
                    <Text>点我改变homeStore</Text>
                </TouchableOpacity>
                {completedHomeStore && Alert.alert(
                    'Alert~~title',
                    'completedHomeStore是一个被检测的变量(就说是变量吧)，homeStore改变时，会触发completedHomeStore这个函数'
                )}
            </View>
        );
    }
}
