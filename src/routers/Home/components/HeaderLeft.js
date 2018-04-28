import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

const HeaderLeft = () =>{
    const getDate = () =>{
        let dateArr = new Date().toDateString().split(' ')
        return {
            year:dateArr[3],
            month:dateArr[1],
            day:dateArr[2]
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.day}>{getDate().day}</Text>
            <Text style={styles.month}>{getDate().month}.</Text>
            <Text style={styles.year}>{getDate().year}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        alignItems:'flex-end'
    },
    day: {
        fontSize: 34,
        fontFamily:'DIN Alternate',
        marginLeft:10,
        color:'black'
    },
    month:{
        fontSize: 12,
        fontFamily:'Euphemia UCAS',
        marginLeft:5,
        marginBottom:6,
        color:'black'
    },
    year:{
        fontSize: 10,
        fontFamily:'Euphemia UCAS',
        marginBottom:6,
        color:'black'
    }
})

export default HeaderLeft