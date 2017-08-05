import React, { Component } from 'react';

// Search button with a preview of the selected image
class UnsplashSearchButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }

        this.showModal = this.showModal.bind(this);
    }

    showModal(e) {
        e && e.preventDefault();
        this.setState({
            showModal: true
        })
    }

    render() {
        return (
            <div className="us-button">
                <button onClick={this.showModal}>Select from Unsplash</button>
                {this.state.showModal === true && (
                    <UnsplashSearchModal />
                )}
            </div>
        )
    }
}

// Modal that let's the user search Unsplash for a background image
class UnsplashSearchModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>Modal to be built...</span>
        )
    }
}

export default UnsplashSearchModal;
export {
    UnsplashSearchButton
}