import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyA5LXJLOaueG1Xuk6CCyIVlzHjx-K0Hd0g",
    authDomain: "countdown-fd1a1.firebaseapp.com",
    databaseURL: "https://countdown-fd1a1.firebaseio.com",
    projectId: "countdown-fd1a1",
    storageBucket: "countdown-fd1a1.appspot.com",
    messagingSenderId: "931739434512"
};

firebase.initializeApp(config);

export default firebase;