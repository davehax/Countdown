import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import firebase from './firebase.js';
import DBUtil from './DBUtil.js';
import PageBackground, { PageBackgroundOverlay } from './PageBackground.js';
import Moment from 'moment';
require('moment/locale/en-au');

// Validation for countdown
const today = new Date();
const dateTimeIsValid = (current) => {
    return current.isAfter(today);
}

// Countdown new form page - submits data to FireBase db
class CountDownNewPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventName: '',
            eventDateTimeValid: false,
            eventDateTime: '',
            eventCreated: false,
            redirectUrl: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    }

    handleChange(e) {
        // e.persist(); // persist synthetic event. Uncomment if error is thrown on change
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDateTimeChange(val) {
        // If we are passed a moment obect, the DateTime component has already validated it
        if (typeof(val) === 'object') {
            this.setState({
                eventDateTimeValid: true,
                eventDateTime: val.format() // ISO8601 is standard format for the moment.js library
            });
        }
        // If we are passed anything else, it's an invalid date
        else {
            this.setState({
                eventDateTimeValid: false
            });
        }
    }

    handleSubmit(e) {
        e && e.preventDefault();

        if (this.state.eventDateTimeValid) {
            // Get a new item key for our event
            let key = firebase.database().ref(DBUtil.itemsKey).push().key;
            let url = DBUtil.generateUrl(this.state.eventName, key);
            // Create our update object
            let update = {};
            // Populate the update object with data
            update['/' + DBUtil.itemsKey + '/' + key] = {
                url: url,
                eventName: this.state.eventName,
                eventDateTime: this.state.eventDateTime
            };
            // Push our data to FireBase
            let updatePromise = firebase.database().ref().update(update);
            // On resolve, redirect. On error, display error
            updatePromise.then((result) => {
                console.log('Update successful. Result: ', result);
                this.setState({
                    eventCreated: true,
                    redirectUrl: url
                });
            }).catch((error) => {
                console.log('Update error. Error: ', error);
            })
        }

    }

    render() {
        if (this.state.eventCreated) {
            return (
                <Redirect to={'/'+this.state.redirectUrl} />
            )
        }

        return (
            <div className="page">
                <PageBackground />
                <PageBackgroundOverlay />
                <div className="page--content">
                    <div className="page--content-scroll">
                        <h1>{this.state.eventName}&nbsp;</h1>
                        <form>
                            <label>
                                <span className="form--label">Counting down to:</span>
                                <input className="form--input" type="text" onChange={this.handleChange} name="eventName" value={this.state.eventName} />
                            </label>
                            <br />
                            <label>
                                <span className="form--label">Which will happen:</span>
                                <DateTime inputProps={{ name: "eventDateTime", readOnly: "readonly", className:"form--input" }} isValidDate={dateTimeIsValid} onChange={this.handleDateTimeChange} />
                            </label>
                            <br />
                            <button className="form--button" onClick={this.handleSubmit} disabled={!this.state.eventDateTimeValid}>Create!</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CountDownNewPage;