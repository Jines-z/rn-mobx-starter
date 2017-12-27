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