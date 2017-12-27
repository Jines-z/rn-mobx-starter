import { observable, useStrict, action } from 'mobx';
useStrict(true)
class ContextStore {
    @observable userInfo = {
        userName:'我是context全局store'
    }
    @action changeStore = (a) =>{
        console.log(a);
        this.userInfo.userName='我是改变过的ContextStore'
    }
}
const contextStore = new ContextStore()
export default contextStore