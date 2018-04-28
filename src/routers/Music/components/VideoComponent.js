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
    render() {
        return (
            <Video
                source={{uri:this.props.GStore.musicMessage.url}}   // Can be a URL or a local file.
                ref={this.setPlayer}                          // Store reference
                rate={1.0}                     // 0 is paused, 1 is normal.
                volume={1.0}                   // 0 is muted, 1 is normal.
                muted={false}                  // Mutes the audio entirely.
                paused={!this.props.store.isPlay}                 // Pauses playback entirely.
                repeat={true}                  // Repeat forever.
                playInBackground={false}       // Audio continues to play when app entering background.
                playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
                progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                onLoad={this.onLoad}
                onProgress={this.onProgress}
                onEnd={() => {
                    let index = this.state.songs.indexOf(this.state.currentSong)
                    index = index == this.state.songs.length-1 ? 0 : index+1
                    this.setState({
                        currentSong: this.state.songs[index],
                        sliderValue: 0,
                        current: '00:00',
                    })
                }}
                onError={(e) => {
                    console.log(e)
                    ToastAndroid.show('mp3资源出错', ToastAndroid.CENTER)
                }}
            />
        )
    }
}