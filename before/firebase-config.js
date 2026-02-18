// ==========================================
//  FIREBASE CONFIGURATION
// ==========================================
// To set up Firebase:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (e.g., "life-with-purpose")
// 3. Go to Project Settings > General > Your apps > Add web app
// 4. Copy the firebaseConfig object and paste below
// 5. Go to Authentication > Sign-in method > Enable Google
// 6. Go to Firestore Database > Create database > Start in production mode
// 7. Set Firestore rules (see firestore.rules file)

var firebaseConfig = {
    apiKey: "AIzaSyAFmxZyH-2OXeEf__PR7FuQYiIJQCgzyss",
    authDomain: "life-work-purpose.firebaseapp.com",
    projectId: "life-work-purpose",
    storageBucket: "life-work-purpose.firebasestorage.app",
    messagingSenderId: "81448899128",
    appId: "1:81448899128:web:ccd2363b540ca0746e4ccd",
    measurementId: "G-3RFW32M8XC"
};

// Initialize Firebase (only if config is filled in)
var firebaseReady = false;
var db = null;
var auth = null;

if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    // Enable offline persistence
    db.enablePersistence({ synchronizeTabs: true }).catch(function(err) {
        console.warn('Firestore persistence failed:', err.code);
    });
    firebaseReady = true;
}
