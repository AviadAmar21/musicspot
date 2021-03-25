importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCGwmkL8XFnHGlE0ojc46OrYTPWCUN0MOM",
    projectId: "musicser-vue",
    messagingSenderId: "337554702246",
    appId: "1:337554702246:web:5c227511ebb9cccaec9967"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message', payload);

    const title = 'Musicser',
        options = {
            body: payload.data.message,
            icon: './logo.png'
        };

    self.registration.showNotification(title,options);
});