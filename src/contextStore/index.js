/* ========================================================

    ** 全局store **

    这里的store通过react的context向全局传递，这里边可以存放例如用户信息，登陆信息，权限等。
    context相关：http://blog.csdn.net/beverley__/article/details/73847518

    MobX：可代替redux的状态管理
    1) useStrict(true)：严格模式，这里的严格模式只约束mobx
    2) @observable：定义被观察者，说白了就是定义一个 *可修改* 的 *局部变量*
    3) @action：唯一可以改变观察者的地方

    优化react组件渲染：
    MobX非常快，甚至比Redux更快。
    1) 使用大量的小组件，并用@observable监测，因为组件越小，它们需要重新渲染产生的变化则越小。这意味着用户界面的更多部分具备彼此*独立渲染*的可能性。
    2) 将大型数据列表抽离成单独的组件。
    3) 尽可能晚一点使用间接引用值。

    MobX中文文档：http://cn.mobx.js.org/

   ====================================================== */

import {observable, useStrict, action} from 'mobx'
useStrict(true)

class ContextStore {

    @observable userInfo = {
        userName: 'rn-mobx-start-kit'
    }

    /**
     * @param {any} transmit 传递过来的参数
     */
    @action changeStore = (transmit) => {
        console.log(transmit)
        this.userInfo.userName = this.userInfo.userName.toLocaleUpperCase()
    }
}

export default new ContextStore()