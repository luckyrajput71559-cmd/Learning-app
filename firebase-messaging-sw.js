importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyASeoEoE8TG3yoBxjO7TaVrM_ZNZnUCvLc",
    authDomain: "cric-falshfire.firebaseapp.com",
    databaseURL: "https://cric-falshfire-default-rtdb.firebaseio.com",
    projectId: "cric-falshfire",
    storageBucket: "cric-falshfire.firebasestorage.app",
    messagingSenderId: "973337900409",
    appId: "1:973337900409:web:b055fd693849c5baeb6ba8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: '/icon.png',
        vibrate: [200, 100, 200],
        data: { link: payload.data?.link || '/' }
    };
    self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const url = event.notification.data?.link || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url.includes(url) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
