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

// Scale width and height dimensions to cover the screen
const scaleDimensionsToCoverScreen = (width, height) => {
    let targetWidth = window.innerWidth;
    let targetHeight = window.innerHeight;

    let scaledWidth = width;
    let scaledHeight = height;

    let screenRatio = window.innerWidth / window.innerHeight;
    let imgRatio = width / height;

    // If the screen is *more* portrait than the image
    // we must take targetHeight and calculate the scaledWidth
    if (screenRatio < imgRatio) {
        scaledHeight = targetHeight;
        scaledWidth = targetHeight * imgRatio;
        
    }
    // If the screen is *less* portrait than the image
    // we must take targetWidth and calculate the scaledHeight
    else {
        scaledWidth = targetWidth;
        scaledHeight = targetWidth / imgRatio;
    }

    return {
        width: scaledWidth,
        height: scaledHeight
    }
}

// Background image component
class PageBackground extends Component {
    constructor(props) {
        super(props);

        this.state = {
            src: this.props.src ? this.props.src : `https://source.unsplash.com/1920x1200/?${getRandomSearchTerm()}`,
            backgroundColor: '#000',
            opacity: 0,
            width: 0,
            height: 0,
            oWidth: 0,
            oHeight: 0
        };

        this.waitForImageToLoad = this.waitForImageToLoad.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    componentDidMount() {
        this.waitForImageToLoad();
        window.addEventListener('resize', this.handleWindowResize);
    }

    // Compare props and state with new props and new state -- if there's no diff then we don't need to render!
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowequal(nextProps, this.props) || !shallowequal(nextState, this.state);
    }

    // When component receives new props
    componentWillReceiveProps(nextProps) {
        if (!shallowequal(nextProps, this.props)) {
            if (nextProps.src !== this.props.src) {
                // time to party - reset opacity to 0
                this.setState({
                    opacity: 0
                });

                // call waitForImageToLoad manually, and pass in the next src
                this.waitForImageToLoad(nextProps.src);
            }

            if (nextProps.backgroundColor !== this.props.backgroundColor) {
                this.setState({
                    backgroundColor: nextProps.backgroundColor
                });
            }
        }
    }

    // When the component is about to be unmounted
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    // Handle window resize
    handleWindowResize() {
        if (this.state.oWidth !== 0 && this.state.oHeight !== 0) {
            let imgDimensions = scaleDimensionsToCoverScreen(this.state.oWidth, this.state.oHeight);
            this.setState({
                width: imgDimensions.width,
                height: imgDimensions.height
            });
        }
    }

    // Enable smooth transition to the next image
    // Create a new Image object and wait for it to load before triggering a state change
    waitForImageToLoad(src) {
        let srcPassedIn = !!src; // force true/false value
        // if we're not passed a parameter, default to state
        src = src || this.state.src;

        // Create an image object
        let img = new Image();

        // Wait for the onload callback to be fired
        // We use the full function() {} syntax here to enable inline .bind(this)
        img.onload = function(e) {
            // Calculate new width and height based on viewport
            let imgDimensions = scaleDimensionsToCoverScreen(e.target.width, e.target.height);
            let oDimensions = {
                width: e.target.width,
                height: e.target.height
            }

            // Basically a cheat for waiting for the opacity:0 animation to end
            // A better way to do this would to be binding on the animation end event
            window.setTimeout(function() {
                // Set the new dimensions for the image
                this.setState({
                    width: imgDimensions.width,
                    height: imgDimensions.height,
                    oWidth: oDimensions.width,
                    oHeight: oDimensions.height
                });


                window.setTimeout(function() {
                    let newState = {
                        opacity: 1
                    }
                    if (srcPassedIn) {
                        newState.src = src
                    }
                    this.setState(newState);
                }.bind(this), 100);

            }.bind(this), 300);

        }.bind(this);

        // Ensure opacity is 0...
        this.setState({
            opacity: 0
        });
        
        // Finally, set the image src
        img.src = ''; // just to be safe, this is the old school way of forcing onLoad to be called again
        img.src = src;
    }

    render() {
        return (
            <div className="page--background" style={{ backgroundColor: this.state.backgroundColor }}>
                <img src={this.state.src} alt="Background" style={{ 
                    opacity: this.state.opacity,
                    width: `${this.state.width}px`,
                    height: `${this.state.height}px`
                }} />
            </div>
        )
    }
}

// Background image overlay component - used to reduce the vividness of the background
const PageBackgroundOverlay = ({ backgroundColor }) => {
    backgroundColor = backgroundColor || 'rgba(0, 0, 0, 0.35)';
    
    return (
        <div className="page--background--overlay" style={{
            backgroundColor: backgroundColor
        }} />
    )
}

export default PageBackground;
export {
    PageBackgroundOverlay
}