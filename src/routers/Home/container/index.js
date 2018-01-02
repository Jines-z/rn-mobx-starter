import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import store from '../store'
import Context from '../components/Context'
import Props from '../components/Props'
import { observer } from 'mobx-react';
// @observer：@是es7的修饰符，在mobx中，@observer可以将组件定义为观察者，@observer后必须跟着class，否则报错。观察者的作用是监测组件内被观察的变量，当被观察的变量改变时，组件render更新。
// 注意这里的更新是同步的呦～
@observer
export default class Home extends Component<{}> {
    render() {
        const { homeStore,changeText,completedHomeStore } = store
        const propStore = {
            homeStore,
            completedHomeStore,
            changeHomeStore(a){
                changeText(a)
            }
        }
        return (
            <View style={styles.container}>
                <Context></Context>
                <Props {...propStore}></Props>
                <View style={{flex:1,flexDirection:'row',alignItems:'flex-end'}}>
                    <Text style={styles.bottom} onPress={()=>{this.props.navigation.navigate('Mine')}}>
                        点我跳转到Mine
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottom:{
        marginBottom:30
    }
});