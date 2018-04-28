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
    @observable abRotate = 0
    @action changeIsPlay = (boolean) =>{
        this.isPlay = boolean
    }
    @action changeSliderValue = (num) =>{
        this.sliderValue = num
    }
    @action changeSliderMaxValue = (num) =>{
        this.sliderMaxValue = num
    }
    @action changeCurrent = (tran) =>{
        this.current = tran
    }
    @action changeDuration = (num) =>{
        this.duration = num
    }
    @action changeIsLoad = () =>{
        this.isLoad = true
    }
    @action changePlayer = (ref) =>{
        this.player = ref
    }
    @action changeAbRotate = (num) =>{
        this.abRotate = num
    }

}

export default Store