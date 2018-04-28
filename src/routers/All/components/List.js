import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Platform,
    StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react'

@inject('GStore')
@observer
export default class List extends Component<{}> {
    delete = (id) =>{
        this.props.GStore.delete(id)
    }
    render() {
        const {list} = this.props.GStore
        return (
            <View style={styles.container}>
                {list.map((item,i)=>
                    <View style={styles.row} key={i}>
                        <View style={styles.content}>
                            <View style={styles.left}>
                                <Image source={item.image} style={styles.image} />
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.text} numberOfLines={1}>{item.content}</Text>
                                <Text style={styles.photographer}>{item.photographer}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'column'
    },
    row:{
        backgroundColor:'white',
        height:70,
        paddingLeft:15,
        paddingTop:10
    },
    content:{
        height:60,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingRight:15
    },
    left:{
        width:50,
        height:50,
        backgroundColor:'white',
        overflow:'hidden'
    },
    right:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        paddingBottom:11,
        paddingTop:Platform.OS == "android" ? 0 : 2,
        paddingHorizontal:15
    },
    image:{
        width:80,
        height:(500*80)/750,
        alignSelf:'center'
    },
    text:{
        fontSize:15,
        fontWeight:'200'
    },
    photographer:{
        fontSize:13,
        opacity:.6,
        fontWeight:'200',
    }
})