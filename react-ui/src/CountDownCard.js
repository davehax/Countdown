import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

class CountDownCard extends Component {
    render() {
        let displayEventDateTime = new Moment(this.props.item.eventDateTime).format("MMMM Do, YYYY, h:mm a");
        return (
            <Link className="countdown--card" to={'/' + this.props.item.url}>
                <h2>{this.props.item.eventName}</h2>
                <p>{displayEventDateTime}</p>
            </Link>
        )
    }
}

export default CountDownCard;