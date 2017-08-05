import React, { Component } from 'react';
import shallowequal from 'shallowequal';

class UnsplashCredit extends Component {
    constructor(props) {
        super(props);

        let className = ['unsplash-credit'];
        if (this.props.bar === true) {
            className.push('unsplash-credit-bar');
        }

        this.state = {
            className: className
        }
    }

    // Compare props and state with new props and new state -- if there's no diff then we don't need to render!
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowequal(nextProps, this.props) || !shallowequal(nextState, this.state);
    }

    render() {
        return (
            <div className={this.state.className.join(' ')}>
                <span>Images provided by <a href="">Unsplash</a></span>
            </div>
        )
    }
}

export default UnsplashCredit;