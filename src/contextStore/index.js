/* ========================================================

    ** 全局store **

    这里的store通过react的context向全局传递，这里边可以存放例如用户信息，登陆信息，权限等。
    context相关：http://blog.csdn.net/beverley__/article/details/73847518

    Mobx：
    1) useStrict(true)：严格模式，这里的严格模式只约束mobx
    2) @observable：定义被观察者，说白了就是定义一个 *可修改* 的 *局部变量*
    3) @action：唯一可以改变观察者的地方

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