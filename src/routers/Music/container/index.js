import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { inject, Provider, observer } from 'mobx-react'
import Store from '../store'
import Album from '../components/Album'
import Player from '../components/Player'
import VideoComponent from '../components/VideoComponent'

@inject('GStore')
@observer
export default class Music extends Component {
    constructor(){
        super()
        this.store = new Store
    }
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: {
            borderBottomWidth:0,
            elevation: 0
        }
    })
    render() {
        return (
            <Provider store={this.store}>
                <View style={styles.container}>
                    <Album  />
                    <Player />
                    <VideoComponent />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})