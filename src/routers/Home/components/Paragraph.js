import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import {inject} from 'mobx-react'
const {width} = Dimensions.get('window')
import data from '../data'

@inject('GStore')
export default class Paragraph extends Component <{}> {
    shouldComponentUpdate(nextProps){
        if (this.props == nextProps || this.props != nextProps) {
            return false
        } else {
            return true
        }
    }
    pressImage = (item) =>{
        this.props.GStore.changeList(item)
    }
    render(){
        return (
            <View style={styles.container}>
                {data.map((item,i)=>
                    <View key={i} style={styles.wrap}>
                        <TouchableOpacity activeOpacity={1} onPress={e=>this.pressImage(item)}>
                            <Image source={item.image} style={styles.image}/>
                        </TouchableOpacity>
                        <Text style={styles.photographer}>摄影丨{item.photographer}</Text>
                        <View style={styles.content}>
                            <Text style={styles.text} >{item.content}</Text>
                        </View>
                        <Text style={styles.author}>{item.author}</Text>
                    </View>
                )}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrap:{
        width:width,
        backgroundColor:'white',
        marginBottom:6
    },
    image:{
        width:width,
        height:(500*width)/750,
        marginBottom:10
    },
    photographer:{
        fontSize:12,
        color:'gray',
        alignSelf:'center',
        marginBottom:50
    },
    content:{
        width:width*0.75,
        alignSelf:'center',
        marginBottom:50
    },
    text:{
        color:'black',
        opacity:.8,
        lineHeight:28
    },
    author:{
        fontSize:12,
        color:'gray',
        alignSelf:'center',
        marginBottom:30
    }
})
