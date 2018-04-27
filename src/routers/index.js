import React from 'react'
import { Platform } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Home from './Home'
import Mine from './Mine'
import All from './All'
import Music from './Music/container'

const Tab = TabNavigator({
    Home: {
        screen: Home
    },
    All: {
        screen: All
    },
    Mine: {
        screen: Mine
    }
}, {
    tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled: false, // 是否允许在标签之间进行滑动。
    animationEnabled: false, // 是否在更改标签时显示动画。
    lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    initialRouteName: '', // 设置默认的页面组件
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        // iOS属性
        // activeBackgroundColor:'blue', //label和icon的背景色 活跃状态下（选中） 。
        // inactiveBackgroundColor:'green', // label和icon的背景色 不活跃状态下（未选中）。
        // style:{}, // tabbar的样式。
        // labelStyle:{}, //label的样式。
        // 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
        activeTintColor: 'black', // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor: 'black', // label和icon的前景色 不活跃状态下(未选中)。
        showLabel: true, // 是否显示label，默认开启。

        // 安卓属性
        // showLabel:true, //是否显示label，默认开启。
        // scrollEnabled:true, // 是否启用可滚动选项卡。
        // tabStyle:{}, // tab的样式。
        // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
        // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
        // pressColor: 'material', // material涟漪效果的颜色（安卓版本需要大于5.0）。
        showIcon: true, // 是否显示图标，默认关闭。
        style: {
            height: Platform.OS == "android" ? 60 : 50,
            backgroundColor: 'white',
            borderBottomWidth:1,
            borderBottomColor:'#E8E8E8',
            borderColor:'#E8E8E8',
            elevation: 1,
            paddingTop:Platform.OS == "android" ? 0 : 5
        }, // tabbar的样式。
        labelStyle: {
            fontSize: 12
        }, // label的样式。
        upperCaseLabel: false, // 是否使标签大写，默认为true。
        indicatorStyle: {
            height: 0
        } // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。

    }
})

// 将需要跳转的页面注册在这里，全局才可以跳转
export default Routers = StackNavigator({
    // 将Tab包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    Tab: {
        screen: Tab
    },
    Music: {
        screen: Music
    },
}, {})