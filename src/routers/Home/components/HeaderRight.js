import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import {observer} from 'mobx-react'

import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import IconE from 'react-native-vector-icons/dist/Entypo'
import Get from '../../../service/Get'

@observer
export default class HeaderRight extends Component <{}> {
    static contextTypes = {
        store: PropTypes.object
    }
    getLocation = () =>{
        return new Promise ((resolve, reject)=>{
            navigator.geolocation.getCurrentPosition((position)=>{
                resolve(position.coords)
            },(error)=>{
                let errorMessage = '失败：' + JSON.stringify(error.message)
                reject(errorMessage)
            },{
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            })
        })
    }
    componentDidMount(){
        const {right} = this.context.store
        if (right.city == '') {
            this.getLocation().then((coords)=>{
                const {longitude,latitude} = coords
                let url = 'http://restapi.amap.com/v3/geocode/regeo?'
                let options = {
                    key:'d692602fc4aa285121e4bde52aab5e22',
                    location:longitude+','+latitude
                }
                Get(url,options,(responseBody)=>{
                    if(responseBody.status ==1){
                        const {adcode,city,district} = responseBody.regeocode.addressComponent
                        let url = 'http://restapi.amap.com/v3/weather/weatherInfo?'
                        let options = {
                            key:'d692602fc4aa285121e4bde52aab5e22',
                            city:adcode,
                            extensions:'base',
                            output:'JSON'
                        }
                        Get(url,options,(res)=>{
                            if (res.status == 1) {
                                console.log(res)
                                const {weather,temperature} = res.lives[0]
                                let tran = {
                                    city,
                                    district,
                                    weather,
                                    temperature
                                }
                                this.context.store.changeRight(tran)
                                console.log(this.context.store)
                            }
                        })
                    }
                })
            }).catch((errorMessage)=>{
                console.log(errorMessage)
            })
        }

    }
    shouldComponentUpdate(nextProps){
        if (this.props == nextProps) {
            return false
        } else {
            return true
        }
    }
    render(){
        const {city,weather,temperature} = this.context.store.right
        return (
            <View style={styles.container}>
                <Text style={styles.city}>{city}</Text>
                <IconE name='dot-single' color='gray'/>
                <Text style={styles.weather}>{weather}</Text>
                <Text style={styles.temperature}>{temperature}</Text>
                <Icon name='temperature-celsius' size={12} style={styles.icon} color='gray'/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        alignItems:'flex-end',
        marginTop:12
    },
    city: {
        fontSize: 11,
        fontFamily:'Euphemia UCAS',
        color:'gray'
    },
    district:{
        fontSize: 11,
        fontFamily:'Euphemia UCAS',
        color:'gray'
    },

    weather:{
        fontSize: 11,
        fontFamily:'Euphemia UCAS',
        color:'gray'
    },
    temperature:{
        fontSize: 11,
        fontFamily:'Euphemia UCAS',
        color:'gray',
        marginLeft:5,
    },
    icon:{
        marginRight:6,
        fontWeight:'100'

    }

})
