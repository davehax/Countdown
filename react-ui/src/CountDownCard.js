import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'moment';

class CountDownCard extends Component {
    render() {
        // let t = new moment(this.props.item.eventDateTime).format();
        return (
            <div className="countdown--card">
                <Link to={'/' + this.props.item.url}>
                    <h1>{this.props.item.eventName}</h1>
                    <h3>{this.props.item.eventDateTime}</h3>
                </Link>
            </div>
        )
    }
}

export default CountDownCard;