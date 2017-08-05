import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewCountDownLink extends Component {
    render() {
        return (
            <Link to="/new">Create your own!</Link>
        )
    }
}

export default NewCountDownLink;