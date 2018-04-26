import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    Platform
} from 'react-native'
import { packageVersion } from 'react-native-update'
import Update from '../components/Update'

const { width } = Dimensions.get('window')

const mine        = require('../../../assets/mine.png')
const mine_active = require('../../../assets/mine_active.png')
const ground      = require('../../../assets/landGround.png')

export default class Mine extends Component<{}> {
    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
        gesturesEnabled: true,
        tabBarVisible: true,
        tabBarIcon: (({tintColor, focused}) => {
            return (
                <Image
                    source={!focused ? mine : mine_active}
                    style={[{height: 20, width: 20}, {resizeMode: 'stretch'}]}
                />
            )
        }),
        tabBarLabel: '我的'
    })
    render() {
        return (
            <View style={styles.container}>
                <Image source={ground} style={styles.ground} />
                <View style={Platform.OS == 'android' ? styles.shadowAndroid : styles.shadowIos} />
                <Update />
                <View style={styles.willLogin}>
                    <Text style={styles.edition}>版本号: {packageVersion}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    ground:{
        width:width,
        height:(730*width)/750
    },
    shadowAndroid:{
        width:width,
        flex:1,
        backgroundColor:'rgb(244,243,247)'
    },
    shadowIos:{
        width:width,
        height:100,
        transform: [
            {translateY: -20}
        ],
        backgroundColor:'white',
        shadowColor:'white',
        shadowOffset:{
            width: 0,
            height: -40
        },
        shadowOpacity:1,
        shadowRadius:20
    },
    willLogin:{
        alignSelf: "center",
        position:'absolute',
        bottom:20
    },
    edition:{
        color:'gray',
        fontSize:12,
    }

})