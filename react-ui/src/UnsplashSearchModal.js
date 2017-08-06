import React, { Component } from 'react';
import UnsplashCredit, { UnsplashCreditAuthor } from './UnsplashCredit.js';
import unsplash from './Unsplash.js'; // already initialised with our app id and secret
import { toJson } from 'unsplash-js';
import Loading from './Loading.js';

// Search button with a preview of the selected image
class UnsplashSearchButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            selectedItem: null
        }

        this.showModal = this.showModal.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSelect(item) {
        this.setState({
            selectedItem: item,
            showModal: false
        });

        // pass selected item up to parent
        this.props.onSelect(item);
    }

    onClose(e) {
        // If it was a button click event, prevent a postback
        e && e.preventDefault();

        this.setState({
            showModal: false
        });
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
                <UnsplashSearchModal visible={this.state.showModal} onSelect={this.onSelect} onClose={this.onClose} />
            </div>
        )
    }
}

// Modal that let's the user search Unsplash for a background image
class UnsplashSearchModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

            searchResults: [],
            searchString: '',
            searchPage: 1,
            searchPerPage: this.props.perPage || 20,

            selectedResultId: -1
        }

        this.modalContainerClick = this.modalContainerClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearchTermsKeyDown = this.onSearchTermsKeyDown.bind(this);
        this.searchUnsplash = this.searchUnsplash.bind(this);
        this.selectResult = this.selectResult.bind(this);
        this.selectOnClick = this.selectOnClick.bind(this);
    }

    // Modal container click event
    // Only close then modal when we click on the background container!
    // To do this, we compare the target element to the ref defined in our render method
    modalContainerClick(e) {
        e.persist();
        if (e.target === this.refs.container) {
            this.props.onClose();
        }
    }

    // onChange event for simple input elements
    onChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }

    // onSearchTermsChange
    onSearchTermsKeyDown(e) {
        if (e.keyCode === 13) {
            // enter key was pressed - trigger search!
            this.searchUnsplash();
        }
    }

    // Search Unsplash free images API
    searchUnsplash(e) {
        e && e.preventDefault();

        // Reset the selected image
        // Reset the search results
        // Set our state to isLoading = true
        this.setState({
            selectedResultId: -1,
            searchResults: [],
            isLoading: true
        });

        // search Unsplash!
        unsplash.search.photos(this.state.searchString, 1, this.state.searchPerPage)
            .then(toJson) // toJson is a helper function from the unsplash-js npm package
            .then((json) => {
                // Set state to finished loading
                // and our search results
                this.setState({
                    isLoading: false,
                    searchResults: json.results
                });
            });
    }

    // On search result click
    selectResult(item) {
        this.setState({
            selectedResultId: item.id
        });
    }

    // Select button on click
    selectOnClick(e) {
        e && e.preventDefault();

        let selectedItem = this.state.searchResults.find((result) => {
            return result.id === this.state.selectedResultId;
        })

        // Pass the selected item up to our parent component
        this.props.onSelect(selectedItem);
    }

    render() {
        if (this.props.visible !== true) {
            return null;
        }

        let selectClass = ['us-modal--select'];
        if (this.state.selectedResultId !== -1) {
            selectClass.push('us-modal--select--enabled');
        }

        return (
            <div className="us-modal--container" onClick={this.modalContainerClick} ref="container">
                <div className="us-modal">
                    <div className="us-modal--content">
                        {/* Modal contents  */}
                        <h1 className="us-modal--title">
                            <span>Select a Background Image</span>
                            <button className="us-modal--close" onClick={this.props.onClose}>&times;</button>
                        </h1>
                        <div className="us-modal--search">
                            <input placeholder="Search Unsplash by topic or colour" type="text" name="searchString" className="us-modal--search--input" value={this.state.searchString} onChange={this.onChange} onKeyDown={this.onSearchTermsKeyDown} />
                            <button className="us-modal--search--button" onClick={this.searchUnsplash}>Search</button>
                        </div>
                        {/* Unsplash search results  */}
                        <div className="us-modal--results">
                            {this.state.isLoading ? (
                                <Loading />
                            ) : (
                                this.state.searchResults.map((result, idx) => {
                                    return <UnsplashSearchResult item={result} onClick={this.selectResult} key={idx} selected={this.state.selectedResultId === result.id} />
                                })
                            )}
                        </div>
                        {/* Confirm image selection  */}
                        <div className={selectClass.join(' ')}>
                            <button disabled={this.state.selectedResultId === -1} className="us-modal--select--button" onClick={this.selectOnClick}>Select</button>
                        </div>
                        {/* End modal contents  */}
                    </div>
                </div>
            </div>
        )
    }
}

const UnsplashSearchResult = ({ item, onClick, selected }) => {
    // class name logic
    let className = ['us-result--item'];
    if (selected === true) {
        className.push('us-result--item--selected');
    }

    // on click, pass up the selected item
    let _onClick = (e) => {
        e && e.preventDefault();
        onClick(item);
    }

    return (
        <div className={className.join(' ')} onClick={_onClick}>
            <div className="us-result--item--viewport">
                <img src={item.urls.thumb} />
            </div>
            <UnsplashCreditAuthor item={item} small={true} />
        </div>
    )
}

export default UnsplashSearchModal;
export {
    UnsplashSearchButton
}