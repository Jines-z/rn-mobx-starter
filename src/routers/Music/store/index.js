import { observable, configure, action, computed } from 'mobx'
configure({enforceActions: true})

class Store {
    @observable isLoad = false
    @observable isPlay = false
    @observable player = null
    @observable sliderValue = 0
    @observable sliderMaxValue = 0
    @observable current = '--:--'
    @observable duration = '--:--'
    @action changeIsPlay = (tran) =>{
        this.isPlay = tran
    }
    @action changeSliderValue = (tran) =>{
        this.sliderValue = tran
    }
    @action changeSliderMaxValue = (tran) =>{
        this.sliderMaxValue = tran
    }
    @action changeCurrent = (tran) =>{
        this.current = tran
    }
    @action changeDuration = (tran) =>{
        this.duration = tran
    }
    @action changeIsLoad = () =>{
        this.isLoad = true
    }
    @action changePlayer = (tran) =>{
        this.player = tran
    }

}

export default Store