import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageBackground, { PageBackgroundOverlay } from './PageBackground.js';
import NewCountDownLink from './NewLink.js';
import Loading from './Loading.js';
import UnsplashCredit from './UnsplashCredit.js';
import firebase from './firebase.js';
import DBUtil from './DBUtil.js';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const quickPad = (n) => {
    n = '' + n;
    return n.length >= 2 ? n : '0'+n;
}

// Countdown display page - retrieves data from FireBase db
class CountDownDisplayPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: null,
            intervalId: -1,
            eventDateTimeDisplay: '',
            differenceIn: null,
            redirect: false,
            redirectUrl: ''
        };

        this.calculateDateTimeDifference = this.calculateDateTimeDifference.bind(this);
    }

    componentDidMount() {
        // Get a reference to the countdown items collection in the db
        let ref = firebase.database().ref(DBUtil.itemsKey);

        // order by 'url' field, then specificy a query on the 'url' field for only those that match 'this.props.match.params.id'
        ref.orderByChild('url').equalTo(this.props.match.params.id).once('value', (snapshot) => {
            // Get the value of the snapshot and construct a collapsed object for use by our component
            let items = snapshot.val();

            // if null, the item doesn't exist therefore we must re-route to /404
            if (items !== null) {
                let newState = {};

                // We use a for statement, but we know we will only retrieve once value from the DB
                for (let item in items) {
                    // therefore we will simply construct a single object instead of an array of objects
                    newState = {
                        id: item,
                        eventName: items[item].eventName,
                        eventDateTime: items[item].eventDateTime,
                        url: items[item].url
                    }
                }

                // Set document title
                document.title = `Countdown to ${newState.eventName}`;
                
                this.setState({
                    item: newState,
                    eventDateTimeDisplay: new moment(newState.eventDateTime).format("MMMM Do, YYYY, h:mm a"),
                    // Set an interval for updating our state
                    intervalId: window.setInterval(this.calculateDateTimeDifference, 1000)
                });

            }
            else {
                this.setState({
                    redirect: true,
                    redirectUrl: '/404'
                });
            }
        });
    }

    componentWillUnmount() {
        // clear the interval
        if (this.state.intervalId !== -1) {
            window.clearInterval(this.state.intervalId);
        }
    }

    calculateDateTimeDifference(eventDateTime) {
        eventDateTime = eventDateTime || this.state.item.eventDateTime
        let from = new moment();
        let to = new moment(eventDateTime);
        let diff = moment.range(from, to);

        // difference in...
        // years
        // months
        // days
        // hours
        // minutes
        // seconds
        let differenceIn = {
            years: diff.diff('years'),
            yearsString: 'year',

            months: diff.diff('months'),
            monthsString: 'month',

            days: diff.diff('days'),
            daysString: 'day',

            hours: diff.diff('hours') % 24,
            hoursString: 'hour',

            minutes: diff.diff('minutes') % 60,
            minutesString: 'minute',

            seconds: diff.diff('seconds') % 60,
            secondsString: 'second'
        }

       if (differenceIn.years !== 1) { differenceIn.yearsString += 's'; }
       if (differenceIn.months !== 1) { differenceIn.monthsString += 's'; }
       if (differenceIn.days !== 1) { differenceIn.daysString += 's'; }
       if (differenceIn.hours !== 1) { differenceIn.hoursString += 's'; }
       if (differenceIn.minutes !== 1) { differenceIn.minutesString += 's'; }
       if (differenceIn.seconds !== 1) { differenceIn.secondsString += 's'; }

        this.setState({
            differenceIn: differenceIn
        });

        return differenceIn;
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={this.state.redirectUrl} />;
        }

        return (
            <div className="page">
                <PageBackground />
                <PageBackgroundOverlay />
                <div className="page--content">
                    <div className="page--content-scroll">
                        {this.state.item === null || this.state.differenceIn === null ? (
                            <Loading />
                        ) : (
                            <div>
                                <h1>{this.state.item.eventName}</h1>
                                <p>{this.state.eventDateTimeDisplay}</p>
                                {this.state.differenceIn.years > 0 && (
                                    <p>{`${this.state.differenceIn.years} ${this.state.differenceIn.yearsString}`}</p>
                                )}
                                {this.state.differenceIn.months > 0 && (
                                    <p>{`${this.state.differenceIn.months} ${this.state.differenceIn.monthsString}`}</p>
                                )}
                                {this.state.differenceIn.days > 0 && (
                                    <p>{`${this.state.differenceIn.days} ${this.state.differenceIn.daysString}`}</p>
                                )}
                                <p>{`${this.state.differenceIn.hours} ${this.state.differenceIn.hoursString}`}</p>
                                <p>{`${this.state.differenceIn.minutes} ${this.state.differenceIn.minutesString}`}</p>
                                <p>{`${this.state.differenceIn.seconds} ${this.state.differenceIn.secondsString}`}</p>
                                <NewCountDownLink />
                            </div>
                        )}
                    </div>
                </div>
                <UnsplashCredit bar={true} />
            </div>
        )
    }
}

export default CountDownDisplayPage;