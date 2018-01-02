import React, {Component} from 'react';
import PropTypes from 'prop-types'
export default class Provider extends Component<{}> {
    static propTypes = {
        store: PropTypes.object.isRequired
    };

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
//这是简易版的provider，和redux的provider作用一样，用来作为顶层标签，向全局渗透store。
//不懂react的context，打开这个链接看看 http://blog.csdn.net/beverley_/article/details/73847518