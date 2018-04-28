import React, { Component } from 'react'
import {
    StyleSheet,
    Easing,
    View,
    Animated,
    Text,
    Dimensions
} from 'react-native'
import { inject, observer } from 'mobx-react'
const { width } = Dimensions.get('window')

@inject('GStore')
@inject('store')
@observer
export default class Album extends Component <{}> {
    constructor(){
        super()
        this.state = {
            acoRotate:new Animated.Value(0),
            abRotate:new Animated.Value(0)
        }
        this.abAnimation = Animated.timing(this.state.abRotate,{
            toValue: 1,
            duration: 30000,
            easing:Easing.linear,
            useNativeDriver: true
        })
    }
    componentWillReact(){
        if (this.props.store.isPlay) {
            this.startAcoAnimation()
            this.state.abRotate.addListener((e)=>{
                this.props.store.changeAbRotate(e.value)
            })
        } else {
            this.stopAcoAnimation()
            this.abAnimation.stop()
            this.state.abRotate.removeListener()
        }
    }
    startAcoAnimation = () =>{
        Animated.timing(this.state.acoRotate,{
            toValue: 1,
            duration: 500,
            easing:Easing.linear,
            useNativeDriver: true
        }).start(({ finished })=>{
            if (finished) {
                this.startAbAnimation()
            }
        })

    }
    stopAcoAnimation = () =>{
        Animated.timing(this.state.acoRotate,{
            toValue: 0,
            duration: 500,
            easing:Easing.linear,
            useNativeDriver: true
        }).start()
    }
    startAbAnimation = () =>{
        this.state.abRotate.setValue(this.props.store.abRotate)
        this.abAnimation.start(({ finished })=>{
            if (finished) {
                this.startAbAnimation()
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Animated.Image source={require('../../../assets/ab.png')} style={[styles.ab,{
                    transform:[
                        {rotate:this.state.abRotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        })}
                    ]
                }]} />
                <Text style={{display:'none'}}>{this.props.store.isPlay}</Text>
                <Animated.Image source={require('../../../assets/aco.png')} style={[styles.aco,{
                    transform:[
                        {rotate:this.state.acoRotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '20deg']
                        })},
                        {translateX:this.state.acoRotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -47]
                        })},
                        {translateY:this.state.acoRotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 10]
                        })}
                    ]
                }]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    ab:{
        width:width/1.3,
        height:width/1.3,
        position:'absolute',
        top:80,
        left:-50
    },
    aco:{
        width:width/4.6,
        height:width/4.5*752/226,
        alignSelf:'center',
        position:'absolute',
        top:70,
        left:width/1.3-30,
        zIndex:1
    }
})