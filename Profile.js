import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { app } from "./firebase.js";

const db = getFirestore(app);
const auth = getAuth(app);

const fields = [
  "firstname", "lastname", "email", "phoneNumber",
  "address", "dob", "gender", "favFood", "bio"
];


onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
          if (field === "email") {
            input.value = user.email || data[field] || "";
          } else {
            input.value = data[field] || "";
          }
        }
      });
    } else {
      console.log("No user data found.");
    }
  } else {
    console.log("No user signed in.");
  }
});


function loadProfile() {
  fields.forEach(field => {
    const value = localStorage.getItem(field) || "";
    const input = document.getElementById(field);
    if (input) input.value = value;
    if (input) input.readOnly = false;
  });
}

function saveProfile() {
  fields.forEach(field => {
    const input = document.getElementById(field);
    if (input) localStorage.setItem(field, input.value);
  });
}

const editSaveBtn = document.getElementById("editSaveBtn");
let editing = false;

editSaveBtn.addEventListener("click", () => {
  const form = document.getElementById("profileForm");
  const inputs = form.querySelectorAll("input, select, textarea");
  if (!editing) {
    inputs.forEach(input => input.disabled = false);
    editSaveBtn.textContent = "Save";
    editing = true;
  } else {
    inputs.forEach(input => input.disabled = true);
    saveProfile();
    editSaveBtn.textContent = "Edit";
    editing = false;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  loadProfile();
});

const infobtn = document.getElementById("infobtn");
const infocontent = document.getElementById("infocontent");
const infoclosebtn = document.getElementById("infoclosebtn");

infocontent.classList.remove('open');

infobtn.addEventListener('click', () => {
    infocontent.classList.add('open');
});

infoclosebtn.addEventListener('click', () => {
    infocontent.classList.remove('open');
});

const logoutBtn = document.getElementById("logout"); 
const handleLogout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
        window.location.href = "./signIN.html";
    } catch (error) {
        console.error(error);
    }
}

logoutBtn.addEventListener('click', handleLogout);