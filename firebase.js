 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

   const firebaseConfig = {
    apiKey: "AIzaSyCDQgnzdZdgNs4H1S4NDyO-ahfAeNREDec",
    authDomain: "jumia-eg.firebaseapp.com",
    projectId: "jumia-eg",
    storageBucket: "jumia-eg.appspot.com", // <-- fixed here
    messagingSenderId: "1025766113409",
    appId: "1:1025766113409:web:aaf20e237f7977370bcd80",
    measurementId: "G-Y5XJYGBXTZ"
  };

  const app = initializeApp(firebaseConfig);

  export { app };