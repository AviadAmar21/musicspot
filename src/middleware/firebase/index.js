import firebase from 'firebase/app';
import auth from 'firebase/auth';
import storage from 'firebase/storage';

firebase.initializeApp({
    apiKey: "AIzaSyCGwmkL8XFnHGlE0ojc46OrYTPWCUN0MOM",
    authDomain: "musicser-vue.firebaseapp.com",
    databaseURL: "https://musicser-vue-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "musicser-vue",
    storageBucket: "musicser-vue.appspot.com",
    messagingSenderId: "337554702246",
    appId: "1:337554702246:web:5c227511ebb9cccaec9967"
});

export default {
    firebase
}

