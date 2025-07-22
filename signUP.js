// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import {  getAuth, createUserWithEmailAndPassword ,signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
  import { getFirestore, setDoc, doc  } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
  
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
  const db = getFirestore(app);
  // const provider = new GoogleAuthProvider();


signOut(auth).then(() => {
  
}).catch((error) => {
  
})



    console.log(auth);

    const signup = async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const errormessageEl = document.getElementById("errormessage");

        console.log(email, password, firstname, lastname, phoneNumber);
        console.log("signing up ......");

      
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      firstname,
      lastname,
      phoneNumber,
      createdAt: new Date().toISOString()
    });

    console.log("User created:", user);
    window.location.href = "./orderpage.html";
  } catch (error) {
    console.error("Signup error:", error.code, error.message);
      if (error.code === "auth/invalid-credential") {
            errormessageEl.innerHTML = "Invalid email or password";
        }
         else if (error.code === "auth/missing-password") {
            errormessageEl.innerHTML = " Please put in a Password.";
        }
        else{
              errormessageEl.innerHTML ="An Error Occured . Try Again Later "
        }




    // alert("Error: " + error.message);
  } finally {
    console.log("Signup process completed");
  }
};

const signupformEL = document.getElementById("signupform");
if (signupformEL) {
  signupformEL.addEventListener("submit", signup);
} else {
  console.error("Signup form not found!");
}


