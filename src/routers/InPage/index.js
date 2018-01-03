import React, {Component} from 'react'
import {Text, View} from 'react-native'

export default class InPage extends Component<{}> {
    render() {
        return (
            <View>
                <Text onPress={() => {
                    this.props.navigation.navigate('InPage2')
                }}>点我跳转到InPage2</Text>
            </View>
        )
    }
}