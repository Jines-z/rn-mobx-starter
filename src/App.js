/* ========================================================

    ** 设计规范 **

    资源规范：
    1) src下一级目录首字母小写，采用驼峰命名
    2) routers下模块文件夹首字母大写，采用驼峰命名
    3) 通常情况下，一个模块应包含三个文件夹：store状态管理、container容器组件、components组件，和一个index.js。
    4) 所有需被查询路径的组件文件夹内部必须有index.js，es6语法默认忽略index.js
    5) 组件首字母大写，采用驼峰命名

    目录结构：
    - src
        + assets  -> 放静态资源，例如图片
        + contextStore  -> 全局store
        + provider  -> 顶层组件
        - routers  -> 路由栈
            + All
            + Mine
            - Home
                + components
                + container
                + store
                index.js
            index.js -> 在这里注册navigator，注册过的组件，其props会增加navigation属性
        App.js  -> 项目入口

   ====================================================== */

import React, {Component} from 'react'
import { observer,Provider } from 'mobx-react'
import SplashScreen from 'rn-splash-screen'
import GStore from './GStore'
import Routers from './routers'

@observer
export default class App extends Component<{}> {
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide()
        }, 200);
    }
    render() {
        return (
            <Provider GStore={GStore}>
                <Routers screenProps={{themeColor:'white'}}/>
            </Provider>
        )
    }
}


console.disableYellowBox = true