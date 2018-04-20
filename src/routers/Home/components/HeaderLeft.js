import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
export default class HeaderLeft extends Component <{}> {
    shouldComponentUpdate(nextProps){
        if (this.props == nextProps) {
            return false
        }
    }
    getDateArr = () =>{
        let dateArr = new Date().toDateString().split(' ')
        return {
            year:dateArr[3],
            month:dateArr[1],
            day:dateArr[2]
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.day}>{this.getDateArr().day}</Text>
                <Text style={styles.month}>{this.getDateArr().month}.</Text>
                <Text style={styles.year}>{this.getDateArr().year}</Text>
            </View>
        )
    }
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
