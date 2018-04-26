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
    ToastAndroid
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import Video from 'react-native-video'
import Modal from 'react-native-modalbox'
import ScreenLoader from '../../components/ScreenLoader'

let deviceWidth = Dimensions.get('window').width

const SongItem = ({ data, rowID, t }) => {
    let current = t.state.currentSong == data
    return (
        <TouchableOpacity
            onPress={() => {
                t.setState({
                    sliderValue: 0,
                    current: '00:00',
                    videoPause: false,
                    playButton: 'pause-circle',
                    currentSong: t.state.songs[rowID]
                },t.refs.modal.close())
            }
            }
        >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                alignItems: 'center',
                padding: 15
            }}
            >
                <View style={{flexDirection: 'row', alignItems: 'flex-end',}}>
                    <Text style={{color: current ? 'red' : 'black'}}>{data.name}</Text>
                    <Text style={{fontSize: 11, color: current ? 'red' : '#AAA'}}> - {data.artists[0].name}</Text>
                </View>
                { current && <Icon name='play' size={12} color='red' /> }
            </View>
        </TouchableOpacity>
    )
}

export default class Music extends Component {

    constructor() {
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            songDS: ds,
            songs: [],
            currentSong: {},
            sliderValue: 0,
            videoPause: false,
            playButton: 'pause-circle',
            current: '00:00',
        }
    }

    componentDidMount() {

        // 网易云音乐 云音乐热歌榜 api
        let url = 'http://music.163.com/api/playlist/detail?id=3778678&updateTime=-1'
        fetch(url)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                let songs = res.result.tracks
                // 取前20首
                songs.length = 20
                this.setState({
                    songDS: this.state.songDS.cloneWithRows(songs),
                    songs: songs,
                    currentSong: songs[0],
                })
            })
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
        console.log(this.state.currentSong)
        if (!this.state.currentSong.name) return <ScreenLoader />
        return (
            <View style={styles.container}>
                { this.state.songs.length != 0 ?
                    <Video
                        source={{uri:'http://m10.music.126.net/20180426165736/13167d3f8df3372dec9cd640ca81c8cf/ymusic/97bf/77fc/0815/79f1d605ab6f8f1e54dac7ea54536f3a.mp3'}}   // Can be a URL or a local file.
                        ref='video'                           // Store reference
                        rate={1.0}                     // 0 is paused, 1 is normal.
                        volume={1.0}                   // 0 is muted, 1 is normal.
                        muted={false}                  // Mutes the audio entirely.
                        paused={this.state.videoPause}                 // Pauses playback entirely.
                        repeat={false}                  // Repeat forever.
                        playInBackground={false}       // Audio continues to play when app entering background.
                        playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
                        progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                        onProgress={this._onProgress.bind(this)}
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
                    :
                    null
                }

                <Image
                    style={styles.image}
                    source={{uri: this.state.currentSong.album.picUrl}}
                    resizeMode='cover'
                />

                <View style={styles.playingInfo}>
                    <Text>{this.state.currentSong.name} - {this.state.currentSong.artists[0].name}</Text>
                    <Text>{this.state.current} - {this._formatTime(Math.floor(this.state.currentSong.duration / 1000))}</Text>
                </View>
                <View style={styles.playingControl}>
                    <TouchableOpacity onPress={this._playButton.bind(this)}>
                        <Icon name={this.state.playButton} size={40} color='#FFDB42' />
                    </TouchableOpacity>
                    <Slider
                        ref='slider'
                        style={{flex: 1, marginLeft: 10, marginRight: 10}}
                        value={this.state.sliderValue}
                        onValueChange={(value) => {
                            this.setState({
                                videoPause: true,
                                current: this._formatTime(Math.floor(value / 1000))
                            })
                        }
                        }
                        onSlidingComplete={(value) => {
                            this.refs.video.seek(value / 1000)
                            // 判断是否处于播放状态
                            if (this.state.playButton === 'pause-circle') this.setState({videoPause: false})
                        }
                        }
                        maximumValue={this.state.currentSong.duration}
                        step={1}
                        minimumTrackTintColor='#FFDB42'
                    />
                    <TouchableOpacity onPress={() => this.refs.modal.open()}>
                        <Icon name='list-ul' size={30} color='#FFDB42' />
                    </TouchableOpacity>
                </View>

                <Modal style={styles.modal} position={"bottom"} ref='modal'>
                    <ListView
                        initialListSize={20}
                        dataSource={this.state.songDS}
                        renderRow={(rowData, sectionID, rowID) => <SongItem data={rowData} key={rowID} rowID={rowID} t={this} />}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                            return <View style={{borderWidth: .3, borderColor: '#CCC'}} key={rowID}></View>
                        }}
                    />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
        paddingBottom: 50
    },
    image: {
        flex: 1
    },
    playingControl: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    playingInfo: {
        flexDirection: 'row',
        alignItems:'stretch',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    text: {
        color: "black",
        fontSize: 22
    },
    modal: {
        height: 300,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 5,
        paddingBottom: 50
    },
})