import { observable, configure, action, computed } from 'mobx'
configure({enforceActions: true})

class Store {
    @observable isPlay = true
    @action changeIsPlay = () =>{
        this.isPlay = !this.isPlay
    }
}

export default Store