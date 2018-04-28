import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import IconE from 'react-native-vector-icons/Entypo'

const HeaderLeft = ({ navigation }) =>{
    const onPress = () =>{
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} >
                <IconE name='chevron-with-circle-down' size={35} color='#000' />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft:20,
        marginTop:20
    }
})

export default HeaderLeft