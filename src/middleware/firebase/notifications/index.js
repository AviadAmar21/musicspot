import 'firebase/messaging'
import firebaseInstance from '../index';

navigator.serviceWorker.register('firebase-messaging-sw.js', {scope: "firebase-cloud-messaging-push-score"})
    .then((registration) => {
        const messaging = firebaseInstance.firebase.messaging();
        messaging.getToken().then(token => {
            console.log(token);
        });
        messaging.onMessage((payload) => {
            const title = 'musicser',
                options = {
                    body: payload.data.messaging
                };
            registration.showNotification(title,options);
            console.log('Message received',payload);
        });
    }).catch(err => {
    console.log(err);
})