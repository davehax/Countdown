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
            // imgLoading: true,
            opacity: 0
        };

        this.waitForImageToLoad = this.waitForImageToLoad.bind(this);
    }

    componentDidMount() {
        this.waitForImageToLoad();
    }

    waitForImageToLoad(src) {
        let img = new Image();

        img.onload = function() {
            this.setState({
                imgLoaded: true,
                opacity: 1
            });
        }.bind(this);
        
        img.src = src;
    }

    // Compare props and state with new props and new state -- if there's no diff then we don't need to render!
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowequal(nextProps, this.props) || !shallowequal(nextState, this.state);
    }

    // When component receives new props
    componentWillReceiveProps(nextProps) {
        if (!shallowequal(nextProps, this.props)) {
            if (nextProps.src !== this.props.src) {
                // time to party
                this.setState({
                    src: nextProps.src,
                    imgLoaded: false,
                    // imgLoading: false,
                    opacity: 0
                });

                this.waitForImageToLoad(nextProps.src);
            }
        }
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