import { observable, useStrict, action } from 'mobx';
useStrict(true)
class ContextStore {
    @observable userInfo = {
        userName:'rn-mobx-start-kit'
    }
    @action changeStore = (a) =>{
        console.log(a);
        this.userInfo.userName='我改变过了喲~~rn-mobx-start-kit'
    }
}
const contextStore = new ContextStore()
export default contextStore
//这是一个全局store，通过react的context向全局传递，这里边可以存放例如用户信息，登陆信息，权限等
//useStrict(true)，严格模式，这里的严格模式只约束mobx
//@observable的作用是定义被观察者，说白了就是定义一个可修改的局部变量
//@action：唯一可以改变观察者的地方