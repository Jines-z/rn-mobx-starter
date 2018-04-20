import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
export default class HeaderLeft extends Component <{}> {
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => {
                const positionData = position.coords
                console.log(positionData)
                // 经度：positionData.longitude
                // 纬度：positionData.latitude
                fetch('http://restapi.amap.com/v3/geocode/regeo?key=d692602fc4aa285121e4bde52aab5e22&location='+positionData.longitude+','+positionData.latitude+'')
                    .then((response)=>response.json())
                    .then((responseBody)=>{
                        console.log(responseBody);
                        console.log(responseBody.regeocode.addressComponent.province);
                        let city = responseBody.regeocode.addressComponent.province;
                        let district = responseBody.regeocode.addressComponent.district;
                        let township = responseBody.regeocode.addressComponent.township;

                        if(responseBody.status ==1){
                            console.log(city)
                        }
                    }).catch((error)=>{
                    console.log(error);
                })
            },
            (error) => {
                console.warn('失败：' + JSON.stringify(error.message))
            }, {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        )
    }
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
        fontSize: 30,
        fontFamily:'DIN Alternate',
        marginLeft:10
    },
    month:{
        fontSize: 12,
        fontFamily:'Euphemia UCAS',
        marginLeft:5,
        marginBottom:4
    },
    year:{
        fontSize: 10,
        fontFamily:'Euphemia UCAS',
        marginBottom:4
    }
})
