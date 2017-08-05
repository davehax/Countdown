import React, { Component } from 'react';
import shallowequal from 'shallowequal';

const searchTerms = [
    'nature,water',
    'happy',
    'sky',
    'abstract,geometry',
    'sunrise',
    'mountains',
    'city',
    'landscape',
    'abstract',
    'geometry'
]

const getRandomSearchTerm = () => {
    return searchTerms[Math.round(Math.random() * (searchTerms.length - 1))];
}

// Background image component
class PageBackground extends Component {
    constructor(props) {
        super(props);

        this.state = {
            src: this.props.src ? this.props.src : `https://source.unsplash.com/1920x1200/?${getRandomSearchTerm()}`,
            imgLoaded: false,
            opacity: 0
        };
    }

    componentDidMount() {
        let img = new Image();
        img.onload = function() {
            this.setState({
                imgLoaded: true,
                opacity: 1
            });
        }.bind(this);
        img.src = this.state.src;

    }

    // Compare props and state with new props and new state -- if there's no diff then we don't need to render!
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowequal(nextProps, this.props) || !shallowequal(nextState, this.state);
    }

    render() {
        return (
            <div className="page--background" style={{
                backgroundImage: `url(${this.state.src})`,
                opacity: this.state.opacity
            }} />
        )
    }
}

// Background image overlay component - used to reduce the vividness of the background
class PageBackgroundOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundColor: this.props.backgroundColor || 'rgba(0, 0, 0, 0.35)'
        };
    }

    render() {
        return (
            <div className="page--background--overlay" style={{
                backgroundColor: this.state.backgroundColor
            }} />
        )
    }
}

export default PageBackground;
export {
    PageBackgroundOverlay
}