import {
    StackNavigator,
    TabNavigator
} from 'react-navigation'
import React from 'react'
import {
    Image,
    Text,
    Platform
} from 'react-native'
import Home from './Home'
import Mine from './Mine'
import All from './All'
import InPage from './InPage'
import InPage2 from './InPage2'

const home = require('../assets/home.png')
const home_active = require('../assets/home_active.png')
const all = require('../assets/all.png')
const all_active = require('../assets/all_active.png')
const mine = require('../assets/mine.png')
const mine_active = require('../assets/mine_active.png')

const Tab = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions({navigation, screenProps}) {
            return {
                // StackNavigator 属性部分

                // title:'Test1', 同步设置导航和tabbar文字,不推荐使用
                headerTitle: '主页', // 只会设置导航栏文字,
                // header:{}, // 可以自定义导航条内容，如果需要隐藏可以设置为null
                // headerBackTitle:null, // 设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
                // headerTruncatedBackTitle:'', // 设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。
                // headerRight:{}, // 设置导航条右侧。可以是按钮或者其他。
                // headerLeft:{}, // 设置导航条左侧。可以是按钮或者其他。
                headerStyle: {
                    backgroundColor: 'white'
                }, // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
                headerTitleStyle: {
                    fontSize: 30,
                    color: 'black'
                }, // 设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
                // headerBackTitleStyle:{}, // 设置导航条返回文字样式。
                // headerTintColor:'green', // 设置导航栏文字颜色。总感觉和上面重叠了。
                gesturesEnabled: true, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭


                // TabNavigator 属性部分

                // title:'', 同上
                tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
                tabBarIcon: (({tintColor, focused}) => {
                    return (
                        <Image
                            source={!focused ? home : home_active}
                            style={[{height: 20, width: 20}, {resizeMode: 'stretch'}]}
                        />
                    )
                }), // 设置标签栏的图标。需要单独设置。
                tabBarLabel: '主页', // 设置标签栏的title。推荐这个方式。
            }
        }
    },
    All: {
        screen: All,
        navigationOptions({navigation, screenProps}) {
            return {
                headerTitle: 'All',
                headerStyle: {backgroundColor: 'white'},
                headerTitleStyle: {
                    fontSize: 30,
                    color: 'black'
                },
                gesturesEnabled: true,
                tabBarVisible: true,
                tabBarIcon: (({tintColor, focused}) => {
                    return (
                        <Image
                            source={!focused ? all : all_active}
                            style={[{height: 20, width: 20}, {resizeMode: 'stretch'}]}
                        />
                    )
                }),
                tabBarLabel: 'All',
            }
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions({navigation, screenProps}) {
            return {
                headerTitle: '我的',
                headerStyle: {backgroundColor: 'white'},
                headerTitleStyle: {
                    fontSize: 30,
                    color: 'black'
                },
                gesturesEnabled: true,
                tabBarVisible: true,
                tabBarIcon: (({tintColor, focused}) => {
                    return (
                        <Image
                            source={!focused ? mine : mine_active}
                            style={[{height: 20, width: 20}, {resizeMode: 'stretch'}]}
                        />
                    )
                }),
                tabBarLabel: '我的',
                headerRight: (
                    <Text style={{color: 'red', marginRight: 20}} onPress={() => navigation.navigate('Home')}>主页</Text>
                )
            }
        }
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
        // 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
        activeTintColor: 'black', // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor: 'black', // label和icon的前景色 不活跃状态下(未选中)。

        // activeBackgroundColor:'blue', //label和icon的背景色 活跃状态下（选中） 。
        // inactiveBackgroundColor:'green', // label和icon的背景色 不活跃状态下（未选中）。

        showLabel: true, // 是否显示label，默认开启。
        // style:{}, // tabbar的样式。
        // labelStyle:{}, //label的样式。

        // 安卓属性

        // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
        // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
        showIcon: true, // 是否显示图标，默认关闭。
        // showLabel:true, //是否显示label，默认开启。
        style: {
            height: Platform.OS == "android" ? 60 : 50,
            backgroundColor: 'white'
        }, // tabbar的样式。
        labelStyle: {
            fontSize: 12
        }, // label的样式。
        upperCaseLabel: false, // 是否使标签大写，默认为true。
        pressColor: 'material', // material涟漪效果的颜色（安卓版本需要大于5.0）。
        // pressOpacity:'', // 按压标签的透明度变化（安卓版本需要小于5.0）。
        // scrollEnabled:false, // 是否启用可滚动选项卡。
        // tabStyle:{}, // tab的样式。
        indicatorStyle: {
            height: 0
        }, // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。
        // labelStyle:{}, // label的样式。
        // iconStyle:{}, // 图标的样式。
    }
})

// 将需要跳转的页面注册在这里，全局才可以跳转
export default Routers = StackNavigator({
    // 将Tab包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    Tab: {
        screen: Tab
    },
    Home: {
        screen: Home
    },
    Mine: {
        screen: Mine
    },
    All: {
        screen: All
    },
    InPage: {
        screen: InPage
    },
    InPage2: {
        screen: InPage2
    }
}, {})