/* ========================================================

    目录结构：
    - src
        + assets      -> 放静态资源，例如图片
        + components  -> 公共组件
        + data        -> 数据文件
        - routers     -> 路由栈
            + All
            + Mine
            + Home
            - Music
                + components   -> 私有组件
                + container
                + store
                index.js
            index.js   -> 在这里注册navigator，注册过的组件，其props会增加navigation属性
        + service  -> 服务目录
        App.js     -> 项目入口
        GStore.js  -> 全局store

   ====================================================== */

import React, { Component } from 'react'
import { Alert, Platform, ToastAndroid, BackHandler } from 'react-native'
import { observer, Provider } from 'mobx-react'
import { isFirstTime, isRolledBack, markSuccess } from 'react-native-update'
import SplashScreen from 'rn-splash-screen'
import GStore from './GStore'
import Routers from './routers'

@observer
export default class App extends Component<{}> {
    constructor(){
        super()
        this.index = 0
        this.lastBackPressed = 0
    }
    componentWillMount(){
        if (isFirstTime) {
            markSuccess()
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.')
        }
    }
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide()
            if (Platform.OS === 'android') {
                BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
            }
        }, 500)
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
        }
    }
    onBackAndroid = () =>{
        if (this.index == 0) {
            if(this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false
            }
            this.lastBackPressed = Date.now()
            ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT)
            return true
        }

    }
    onNavigationStateChange = (nav) =>{
        this.index = nav.index
    }
    render() {
        return (
            <Provider GStore={GStore}>
                <Routers
                    onNavigationStateChange={this.onNavigationStateChange}
                    screenProps={{themeColor: 'white'}}
                />
            </Provider>
        )
    }
}


console.disableYellowBox = true