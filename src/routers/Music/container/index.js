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
import { inject } from 'mobx-react'
import Album from '../components/Album'
import Video from 'react-native-video'

const { width } = Dimensions.get('window')
const aco = require('../../../assets/aco.png')

@inject('GStore')
export default class Music extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: {
            backgroundColor: screenProps.themeColor,
            borderBottomWidth:0,
            borderBottomColor:'#f2f2f2',
            borderColor:'#f2f2f2',
            elevation: 0
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
    componentDidMount() {

    }
    _playButton() {
        this.setState({
            playButton: this.state.videoPause ? 'pause-circle' : 'play-circle',
            videoPause: !this.state.videoPause
        })
    }

    _onProgress(data) {
        // currentTime 23.313s
        let val = parseInt(data.currentTime * 1000)
        this.setState({
            sliderValue: val,
            current: this._formatTime(Math.floor(data.currentTime))
        })
    }

    _formatTime(time) {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }

    render() {
        return (
            <View style={styles.container}>
                <Album />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})