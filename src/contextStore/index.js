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