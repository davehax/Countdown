import firebase from './firebase.js';

const DBUtil = {
    // Returns a promise that resolves with the unique id to redirect to
    itemsKey: 'countdownItems',
    // uniqueId generator - search by lowercase and whitespace removed name, append firebase ID as well?
    generateUrl: (eventName, id) => {
        return eventName.toLowerCase().replace(/(\/|#|\?|\.|:|\\)/g, '').split(' ').join('-') + '-' + id;
    }
}

export default DBUtil;