import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from './firebase.js';
import DBUtil from './DBUtil.js';
import CountDownCard from './CountDownCard.js';
import PageBackground, { PageBackgroundOverlay } from './PageBackground.js';

class CountDownHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsRef: null,
            items: []
        }
    }

    componentDidMount() {
        let itemsRef = firebase.database().ref(DBUtil.itemsKey);

        // Add a callback - as the database is updated, this will be called
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];

            for (let item in items) {
                newState.push({
                    id: item,
                    eventName: items[item].eventName,
                    eventDateTime: items[item].eventDateTime,
                    url: items[item].url
                });
            }

            this.setState({
                items: newState
            });
        })

        this.setState({
            itemsRef: itemsRef
        });
    }

    componentWillUnmount() {
        // Remove our callback
        if (this.state.itemsRef !== null) { 
            this.state.itemsRef.off('value');
        }
    }

    render() {
        return (
            <div className="page">
                <PageBackground />
                <PageBackgroundOverlay />
                <div className="page--content">
                    <div className="page--content-scroll">
                        <h1>Home Page</h1>
                        <Link to="/new">Create new item</Link>
                        {this.state.items.length > 0 && (
                            this.state.items.map((item) => <CountDownCard item={item} key={item.id} />)
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default CountDownHomePage;