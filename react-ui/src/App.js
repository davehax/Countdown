import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CountDownHomePage from './CountDownHomePage.js';
import CountDownNewPage from './CountDownNewPage.js';
import CountDownDisplayPage from './CountDownDisplayPage.js';
import './App.css';

class FourOhFour extends Component {
    render() {
        return (
            <div className="e-404">
                <h1>Oops! That's a 404</h1>
                <p>Sorry, we couldn't find what you were looking for!</p>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <link href="https://fonts.googleapis.com/css?family=Archivo+Black|Nixie+One|Rosario" rel="stylesheet" />
                    <Switch>
                        {/* Error pages  */}
                        <Route path="/404" component={FourOhFour} />

                        {/* New page  */}
                        <Route path="/new" component={CountDownNewPage} />

                        {/* Display page  */}
                        <Route path="/:id" component={CountDownDisplayPage} />

                        {/* Home page  */}
                        <Route path="/" component={CountDownHomePage} />

                        {/* If nothing else matches, redirect to an error page  */}
                        <Route render={() => <Redirect to="/404" />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
