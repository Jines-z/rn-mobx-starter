import React, {Component} from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'
import { observer } from 'mobx-react'
const all = require('../../assets/all.png')
const all_active = require('../../assets/all_active.png')

@observer
export default class All extends Component<{}> {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: 'All',
        headerStyle: {backgroundColor: screenProps.themeColor},
        headerTitleStyle: {
            fontSize: 30,
            color: 'black'
        },
        gesturesEnabled: true,
        tabBarVisible: true,
        tabBarIcon: (({tintColor, focused}) => {
            return (
                <Image
                    source={!focused ? all : all_active}
                    style={[{height: 20, width: 20}, {resizeMode: 'stretch'}]}
                />
            )
        }),
        tabBarLabel: 'All',
    })
    render() {
        return (
            <View>
                <Text>
                    All
                </Text>
            </View>
        )
    }
}