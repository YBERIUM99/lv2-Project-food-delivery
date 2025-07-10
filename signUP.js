// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import {  getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCDQgnzdZdgNs4H1S4NDyO-ahfAeNREDec",
    authDomain: "jumia-eg.firebaseapp.com",
    projectId: "jumia-eg",
    storageBucket: "jumia-eg.appspot.com", // <-- fixed here
    messagingSenderId: "1025766113409",
    appId: "1:1025766113409:web:aaf20e237f7977370bcd80",
    measurementId: "G-Y5XJYGBXTZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

    console.log(auth);

    const signup = async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log(email);
        console.log(password);
        
        console.log("signing up ......");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            window.location.href = "./orderpage.html";
            
        } catch (error) {
            console.error(error);
        } finally {
            console.log("signup completed");
        }
    }


    const signupformEL = document.getElementById("signupform");
    signupformEL.addEventListener("submit", signup);





