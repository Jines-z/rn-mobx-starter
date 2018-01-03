import React, {Component, PropTypes} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native'
export default class Props extends Component<{}> {
    render() {
        const { homeStore,changeHomeStore,completedHomeStore } = this.props
        return (
            <View>
                <Text>
                    {homeStore}
                </Text>
                <TouchableOpacity onPress={()=>changeHomeStore('11')}>
                    <Text>点我改变homeStore</Text>
                </TouchableOpacity>
                {completedHomeStore && Alert.alert(
                    'homeStore长度大于11了',
                    'homeStore改变时，会触发@completed completedHomeStore这个函数'
                )}
            </View>
        )
    }
}
