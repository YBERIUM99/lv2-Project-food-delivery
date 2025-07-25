import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { app } from "./firebase.js";

const auth = getAuth(app);

const errormessageEl = document.getElementById("errormessage");
const signinform = document.getElementById("signinform");

const handleSignIn = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("signing in ......");
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        
        window.location.href = "./orderpage.html";
    } catch (error) {
        console.log(error);
        console.log(error.code);
        if (error.code === "auth/invalid-credential") {
            errormessageEl.innerHTML = "Invalid email or password";
        }
         else if (error.code === "auth/missing-password") {
            errormessageEl.innerHTML = " Please put in a Password.";
        }
        else{
              errormessageEl.innerHTML ="An Error Occured . Try Again Later "
        }
    }
    finally {
        console.log("signin completed");
    }
}

signinform.addEventListener("submit", handleSignIn);

