"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics = exports.app = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcVIIZa686EgvcWRtfgQ7FTfSwVcz8kao",
    authDomain: "backend-gv.firebaseapp.com",
    projectId: "backend-gv",
    storageBucket: "backend-gv.firebasestorage.app",
    messagingSenderId: "985365493565",
    appId: "1:985365493565:web:38305f4879b7bfd951f754",
    measurementId: "G-J6T520F92Z"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const analytics = (0, analytics_1.getAnalytics)(app);
exports.analytics = analytics;
