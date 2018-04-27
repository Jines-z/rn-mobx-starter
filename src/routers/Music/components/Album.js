import React, { Component } from 'react'
import {
    StyleSheet,
    Easing,
    View,
    Animated
} from 'react-native'

export default class Album extends Component {
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
    componentDidMount(){
        this.startAcoAnimation()
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
        this.state.abRotate.setValue(0)
        this.abAnimation.start(({ finished })=>{
            if (finished) {
                this.startAbAnimation()
            }
        })
    }
    render() {
        return (
            <View stlyle={styles.container}>
                <Animated.Image source={require('../../../assets/ab.png')} style={[styles.ab,{
                    transform:[
                        {rotate:this.state.abRotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        })}
                    ]
                }]}></Animated.Image>
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
        width:280,
        height:280,
        position:'absolute',
        top:80,
        left:-50
    },
    aco:{
        width:90,
        height:90*752/226,
        alignSelf:'center',
        position:'absolute',
        top:50,
        right:20,
        zIndex:1
    }
})