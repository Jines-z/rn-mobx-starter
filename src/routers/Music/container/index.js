import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    Slider,
    TouchableOpacity,
    ListView,
    Platform,
    ToastAndroid,
    Animated
} from 'react-native'
import { inject,Provider } from 'mobx-react'
import Store from '../store'
import Album from '../components/Album'
import Player from '../components/Player'

@inject('GStore')
export default class Music extends Component {
    constructor(){
        super()
        this.store = new Store
    }
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: {
            borderBottomWidth:0,
            elevation: 0
        }
    })

    render() {
        return (
            <Provider store={this.store}>
                <View style={styles.container}>
                    <Album  />
                    <Player />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})