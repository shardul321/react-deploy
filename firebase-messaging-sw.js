 importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

firebase.initializeApp({
    apiKey: "AIzaSyCfMdhOAK6Uqd2n526KNIgx3HdD-cf4IW0",
    authDomain: "reactlogin-e8e14.firebaseapp.com",
    projectId: "reactlogin-e8e14",
    storageBucket: "reactlogin-e8e14.appspot.com",
    messagingSenderId: "269680795912",
    appId: "1:269680795912:web:7e87925da3e22b0cf7ccbd",
    measurementId: "G-4RXLCBNH33"
  })

const initMessaging = firebase.messaging()