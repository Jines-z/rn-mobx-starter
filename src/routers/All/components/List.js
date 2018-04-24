import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('GStore')
@observer
export default class List extends Component<{}> {
    shouldComponentUpdate(nextProps){
        if (this.props.GStore.list.length != nextProps.GStore.length) {
            return true
        } else {
            return false
        }
    }
    render() {
        const {list} = this.props.GStore
        return (
            <View style={styles.container}>
                {list.map((item,i)=>
                    <View key={i} style={styles.row}>
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
        backgroundColor:'white',
        flexDirection:'column'
    },
    row:{
        height:70,
        paddingHorizontal:15,
        paddingTop:10
    },
    content:{
        height:60,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2'
    },
    left:{
        width:50,
        height:50,
        overflow:'hidden'
    },
    right:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        paddingBottom:13,
        paddingTop:2,
        paddingHorizontal:15
    },
    image:{
        width:70,
        height:(500*70)/750,
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