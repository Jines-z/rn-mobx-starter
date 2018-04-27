import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    Easing,
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
import { inject,observer } from 'mobx-react'
import IconF from 'react-native-vector-icons/FontAwesome'

const { width } = Dimensions.get('window')

@inject('GStore')
@inject('store')
@observer
export default class Player extends Component {
    constructor(){
        super()
    }
    componentDidMount(){

    }
    touch = () =>{
        this.props.store.changeIsPlay()
    }
    render() {
        const { singer, music } = this.props.GStore.musicMessage
        return (
            <View style={styles.container}>
                <Text style={styles.music}>{music}</Text>
                <Slider
                    ref='slider'
                    style={styles.slider}
                    value={1000}
                    minimumTrackTintColor='#192c2e'
                    maximumTrackTintColor='#cacaca'
                    maximumValue={100000}
                    thumbImage={require('../../../assets/qe.png')}
                    thumbTintColor='#192c2e'
                />
                <View style={styles.time}>
                    <Text style={styles.timeText}>00.00</Text>
                    <Text style={styles.timeText}>05.00</Text>
                </View>
                <Text style={styles.singer}>{singer}</Text>
                <View style={styles.controller}>
                    <View style={styles.left}>
                        <IconF style={styles.ward} name='fast-backward' />
                        <TouchableOpacity onPress={this.touch}  activeOpacity={1}>
                            {this.props.store.isPlay ?
                                <IconF style={styles.play} name='pause' />
                                :
                                <IconF style={styles.play} name='play' />
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
    container:{
        width:width,
        height:180,
        position:'absolute',
        bottom:0,
        left:0
    },
    music:{
        color:'#192c2e',
        fontSize:13,
        alignSelf:'center'
    },
    slider:{
        marginTop:5,
        marginHorizontal:10,
    },
    time:{
        flexDirection:'row',
        paddingHorizontal:34,
        transform:[
            {translateY:-5}
        ],
        justifyContent :'space-between',
    },
    timeText:{
        color:'#192c2e',
        opacity:.7,
        fontSize:10
    },
    singer:{
        color:'#192c2e',
        fontSize:12,
        opacity:.6,
        alignSelf:'center',
        transform:[
            {translateY:-5}
        ],
    },
    controller:{
        flexDirection:'row',
        justifyContent :'space-between',
        marginTop:30,
        paddingLeft:40,
        paddingRight:45
    },
    left:{
        width:150,
        flexDirection:'row',
        justifyContent :'space-between',
    },
    ward:{
        color:'#cacaca',
        fontSize:24,
    },
    play:{
        color:'#192c2e',
        fontSize:24,
    }
})