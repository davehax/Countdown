import React from 'react';
import { unsplashUTM } from './Unsplash.js';

// ({ bar, item }) => { ... }
// Declares 'bar' and 'item' variables like so
// (props) => { let bar = props.bar; let item = props.item; }
// So the shorthand is a little confusing, but useful
const UnsplashCredit = ({ bar, small, item }) => {
    let className = ['unsplash-credit'];
    if (bar === true) {
        className.push('unsplash-credit--bar');
    }

    if (small === true) {
        className.push('unsplash-credit--small');
    }

    if (item) {
        className.push('unsplash-credit--item');
    }

    return (
        <div className={className.join(' ')}>
            {typeof(item) !== 'undefined' ? (
                <span><a href={`${item.links.html}${unsplashUTM}`}>{item.user.name}</a> | <a href="https://unsplash.com/">Unsplash</a></span>
            ) : (
                <span>Images provided by <a href="https://unsplash.com/">Unsplash</a></span>
            )}
            
        </div>
    )
}

const UnsplashCreditAuthor = ({ item, small }) => {
    let className = ['unsplash-credit'];

    if (small === true) {
        className.push('unsplash-credit--small');
    }

    return (
        <div className={className.join(' ')}>
            <span><a href={`${item.links.html}${unsplashUTM}`}>{item.user.name}</a></span>
        </div>
    )
}

export default UnsplashCredit;
export {
    UnsplashCreditAuthor
}