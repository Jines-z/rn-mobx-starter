import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { observer, inject } from 'mobx-react'
import NoListen from '../components/NoListen'
import List from '../components/List'

const all = require('../../../assets/all.png')
const all_active = require('../../../assets/all_active.png')

@inject('GStore')
@observer
export default class All extends Component<{}> {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: 'All',
        headerStyle: {
            backgroundColor: screenProps.themeColor,
            borderBottomWidth:1,
            borderBottomColor:'#f2f2f2',
            borderColor:'#f2f2f2',
            elevation: 0
        },
        headerTitleStyle: {
            fontSize: 20,
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
        const {list} = this.props.GStore
        return (
            <View>
                {list.length == 0 ?
                    <NoListen />
                    :
                    <List />
                }
            </View>
        )
    }
}