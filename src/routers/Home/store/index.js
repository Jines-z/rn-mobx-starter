import { observable, useStrict, action,computed } from 'mobx';
useStrict(true)
class Store {
    @observable homeStore = '这是homeStore'
    @action changeText = (a) =>{
        console.log(a);
        this.homeStore = '这是改变过的homeStore'
    }
    @computed get completedHomeStore(){
        return this.homeStore.length > 11
    }
}
const store = new Store()
export default store
//useStrict(true)，严格模式，这里的严格模式只约束mobx
//@observable的作用是定义被观察者，说白了就是定义一个可修改的局部变量
//@action：唯一可以改变观察者的地方
//@computed：定义一个计算属性，当homeStore的长度变化之后，@computed会自动执行。