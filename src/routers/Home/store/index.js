import {observable, useStrict, action, computed} from 'mobx'
useStrict(true)

class Store {
    @observable homeStore = '这是homeStore'
    @action changeText = (a) => {
        console.log(a)
        this.homeStore = '这是改变过的homeStore'
    }

    // ------------------------------------
    // @computed：定义一个计算属性，当homeStore的长度变化之后，@computed会自动执行。
    // ------------------------------------
    @computed get completedHomeStore() {
        return this.homeStore.length > 11
    }
}

export default new Store()