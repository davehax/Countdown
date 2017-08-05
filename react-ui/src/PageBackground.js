import React, { Component } from 'react';

// Background image component
class PageBackground extends Component {
    render() {
        let src = this.props.src ? this.props.src : 'https://source.unsplash.com/1920x1200/?abstract,geometry';
        return (
            <div className="page--background" style={{
                backgroundImage: `url(${src})`
            }} />
        )
    }
}

// Background image overlay component - used to reduce the vividness of the background
class PageBackgroundOverlay extends Component {
    render() {
        let backgroundColor = this.props.backgroundColor || 'rgba(0, 0, 0, 0.35)'
        return (
            <div className="page--background--overlay" style={{
                backgroundColor: backgroundColor
            }} />
        )
    }
}

export default PageBackground;
export {
    PageBackgroundOverlay
}