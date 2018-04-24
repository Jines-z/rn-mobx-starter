import React, {Component} from 'react'
import {
    Animated,
    Easing
} from 'react-native'
import {observer} from 'mobx-react'
import IconF from 'react-native-vector-icons/dist/Feather'

@observer
export default class SmallLoader extends Component <{}> {
    constructor() {
        super()
        this.state = {
            rotate:new Animated.Value(0)
        }
    }
    startAnimation = () =>{
        this.state.rotate.setValue(0)
        let timing = Animated.timing
        timing(this.state.rotate,{
            toValue: 1,
            duration: 2000,
            easing:Easing.linear,
            useNativeDriver: true
        }).start(()=> this.startAnimation())
    }
    componentDidMount(){
       this.startAnimation()
    }
    shouldComponentUpdate(){
        return false
    }
    render(){
        return (
            <Animated.View style={{transform:[
                {rotate:this.state.rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                })}
            ]}}>
                <IconF name='loader' size={13} />
            </Animated.View>
        )
    }
}
