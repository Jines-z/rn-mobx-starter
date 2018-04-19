import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import store from '../store'
import Context from '../components/Context'
import Props from '../components/Props'
import {observer} from 'mobx-react'

@observer
export default class Home extends Component<{}> {
    render() {
        console.log(this.props)
        const {homeStore, changeText, completedHomeStore} = store
        const propStore = {
            homeStore,
            completedHomeStore,
            changeHomeStore(a) {
                changeText(a)
            }
        }
        return (
            <View style={styles.container}>
                <Context></Context>
                <Props {...propStore}></Props>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text style={styles.bottom} onPress={() => {this.props.navigation.navigate('Mine')}}>
                        点我跳转到Mine
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottom: {
        marginBottom: 30
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})