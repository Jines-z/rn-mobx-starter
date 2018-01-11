/* ========================================================

    ** 最外层组件 **

    这是简易版的Provider，和redux的Provider作用一样，用来作为顶层标签，向全局渗透store。

   ====================================================== */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Provider extends Component<{}> {

    // ------------------------------------
    // propTypes：store类型校验
    // ------------------------------------
    static propTypes = {
        store: PropTypes.object.isRequired
    }

    // ------------------------------------
    // getChildContext指定的传递给子组件的属性需要先通过 childContextTypes 来指定，否则报错
    // ------------------------------------
    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return this.props.children
    }
}