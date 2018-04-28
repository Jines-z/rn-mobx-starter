import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Slider,
    TouchableOpacity
} from 'react-native'
import { inject,observer } from 'mobx-react'
import IconF from 'react-native-vector-icons/FontAwesome'
import Loader from '../../../components/Loader'

const { width } = Dimensions.get('window')

@inject('GStore')
@inject('store')
@observer
export default class Player extends Component {
    touch = () =>{
        let { changeIsPlay, isPlay } = this.props.store
        changeIsPlay(!isPlay)
    }
    formatTime(time) {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    onValueChange = (value) =>{
        let { changeIsPlay, changeCurrent } = this.props.store
        changeIsPlay(false)
        changeCurrent(this.formatTime(Math.floor(value / 1000)))
    }
    onSlidingComplete = (value) =>{
        let { player, changeIsPlay } = this.props.store
        player.seek(value / 1000)
        changeIsPlay(true)
    }
    render() {
        const { singer, music } = this.props.GStore.musicMessage
        const { current, duration, sliderValue, sliderMaxValue, isPlay, isLoad } = this.props.store
        return (
            <View style={styles.container}>
                <Text style={styles.music}>{music}</Text>
                <Slider
                    ref='slider'
                    style={styles.slider}
                    value={sliderValue}
                    minimumTrackTintColor='#000'
                    maximumTrackTintColor='#cacaca'
                    maximumValue={sliderMaxValue}
                    thumbTintColor='#000'
                    step={1}
                    onValueChange={this.onValueChange}
                    onSlidingComplete={this.onSlidingComplete}
                />
                <View style={styles.time}>
                    <Text style={styles.timeText}>{current}</Text>
                    <Text style={styles.timeText}>{duration}</Text>
                </View>
                <Text style={styles.singer}>{singer}</Text>
                <View style={styles.controller}>
                    <View style={styles.left}>
                        <IconF style={styles.ward} name='fast-backward' />
                        <TouchableOpacity onPress={this.touch}  activeOpacity={1}>
                            {isLoad ?
                                <IconF style={styles.play} name={isPlay ? 'pause' : 'play'} />
                                :
                                <Loader size={22} color='#000' />
                            }
                        </TouchableOpacity>
                        <IconF style={styles.ward} name='fast-forward' />
                    </View>
                    <IconF style={styles.ward} name='download' />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 180,
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    music: {
        color: '#000',
        fontSize: 13,
        alignSelf: 'center',
        opacity:0.8
    },
    slider: {
        marginTop: 5,
        marginHorizontal: 10,
    },
    time: {
        flexDirection: 'row',
        paddingHorizontal: 34,
        transform: [
            {translateY: -5}
        ],
        justifyContent: 'space-between',
    },
    timeText: {
        color: '#000',
        opacity: .7,
        fontSize: 10,
        backgroundColor:'transparent'
    },
    singer: {
        color: '#000',
        fontSize: 12,
        opacity: .6,
        alignSelf: 'center',
        transform: [
            {translateY: -5}
        ],
    },
    controller: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        paddingLeft: 40,
        paddingRight: 45
    },
    left: {
        width: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ward: {
        color: '#cacaca',
        fontSize: 24,
    },
    play: {
        color: '#000',
        fontSize: 24,
    }
})