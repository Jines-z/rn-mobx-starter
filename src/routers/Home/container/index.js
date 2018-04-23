import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
import {observer} from 'mobx-react'
import store from '../store'
import HeaderLeft from '../components/HeaderLeft'
import HeaderRight from '../components/HeaderRight'
import Paragraph from '../components/Paragraph'

const home = require('../../../assets/home.png')
const home_active = require('../../../assets/home_active.png')

@observer
export default class Home extends Component<{}> {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: {
            backgroundColor: screenProps.themeColor,
            borderBottomWidth:1,
            borderColor:'#F2F2F2',
            elevation: 0
        },
        headerLeft:(
            <HeaderLeft />
        ),
        headerRight:(
            <HeaderRight />
        ),
        tabBarIcon: (({tintColor, focused}) => {
            return (
                <Image
                    source={!focused ? home : home_active}
                    style={[{height: 20, width: 20}, {resizeMode: 'stretch'}]}
                />
            )
        }),
        tabBarLabel: '主页',
        gesturesEnabled: true,
    })
    render() {
        const {homeStore, changeText, completedHomeStore} = store
        const propStore = {
            homeStore,
            completedHomeStore,
            changeHomeStore(a) {
                changeText(a)
            }
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Paragraph></Paragraph>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottom: {
        marginBottom: 30
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})