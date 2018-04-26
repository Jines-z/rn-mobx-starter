import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native'
const { height } = Dimensions.get('window')
import IconM from 'react-native-vector-icons/dist/MaterialIcons'

const NoListen = () =>{
    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <IconM name='queue-music' size={45} color='#D7D7DC' style={styles.icon} />
                <Text style={styles.text}>你听过的歌曲将会出现在这里</Text>
                <Text style={styles.text}>快去听一首吧</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        height:height,
        alignItems:'center',
        justifyContent:'center'
    },
    wrap:{
        width:220,
        height:220,
        alignItems:'center',
        justifyContent:'center',
        transform:[
            {translateY:-110}
        ]
    },
    icon:{
        backgroundColor:'transparent'
    },
    text:{
        fontSize:12,
        color:'#D7D7DC',
        marginVertical:3
    }
})

export default NoListen