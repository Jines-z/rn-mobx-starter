import React, { Component } from 'react'
import { ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import Video from 'react-native-video'

@inject('GStore')
@inject('store')
@observer
export default class VideoComponent extends Component {
    onProgress = (data) => {
        let { changeCurrent, changeSliderValue } = this.props.store
        let val = parseInt(data.currentTime * 1000)
        let current = this.formatTime(Math.floor(data.currentTime))
        changeSliderValue(val)
        changeCurrent(current)
    }

    formatTime(time) {
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    onLoad = (e) =>{
        let duration =  this.formatTime(Math.floor(e.duration))
        let maxValue = e.duration*1000
        let { changeIsLoad, changeDuration, changeSliderMaxValue, changeIsPlay } = this.props.store
        changeIsLoad()
        changeIsPlay(true)
        changeDuration(duration)
        changeSliderMaxValue(maxValue)
    }
    setPlayer = (ref) =>{
        this.props.store.changePlayer(ref)
    }
    end = () =>{
        let { changeCurrent, changeSliderValue } = this.props.store
        changeSliderValue(0)
        changeCurrent('00:00')
    }
    render() {
        return (
            <Video
                source={{uri:this.props.GStore.musicMessage.url}}
                ref={this.setPlayer}
                rate={1.0}
                volume={1.0}
                muted={false}
                paused={!this.props.store.isPlay}
                repeat={true}
                playInBackground={false}        // 当app进入后台时，不继续播放
                playWhenInactive={false}        // [iOS] 收到通知时，不继续播放
                progressUpdateInterval={250.0}  // 调用onProgress的间隔
                onLoad={this.onLoad}
                onProgress={this.onProgress}
                onEnd={this.end}
                onError={(e) => {
                    console.log(e)
                    ToastAndroid.show('mp3资源出错', ToastAndroid.CENTER)
                }}
            />
        )
    }
}