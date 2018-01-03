/* ========================================================

    ** 最外层组件 **

    这是简易版的Provider，和redux的Provider作用一样，用来作为顶层标签，向全局渗透store。

    Mobx：
    1) useStrict(true)：严格模式，这里的严格模式只约束mobx
    2) @observable：定义被观察者，说白了就是定义一个 *可修改* 的 *局部变量*
    3) @action：唯一可以改变观察者的地方

   ====================================================== */

import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class Provider extends Component<{}> {

    // ------------------------------------
    // propTypes：store类型校验
    // ------------------------------------
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    // ------------------------------------
    // getChildContext指定的传递给子组件的属性需要先通过 childContextTypes 来指定，否则报错
    // ------------------------------------
    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return this.props.children;
    }
}