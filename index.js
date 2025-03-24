import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Sa0PMmh8LK5F-liz7CDR-aENyW85Mdg", // Replace with your actual API key (but don't hardcode it in production)
  authDomain: "mmumarks.firebaseapp.com",
  databaseURL:
    "https://mmumarks-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mmumarks",
  storageBucket: "mmumarks.firebasestorage.app",
  messagingSenderId: "970177041618",
  appId: "1:970177041618:web:81b1e00d0b80ed2380c90b",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document
  .getElementById("passkeyForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    const num3 = document.getElementById("num3").value;

    let passkey = num1 + num2 + num3;

    validatePasskey(passkey);
  });

function validatePasskey(passkey) {
  const passkeyRef = ref(database, "members/" + passkey); // Replace "members" with your data path

  get(passkeyRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Passkey exists in the database
        console.log("Passkey is valid!");
        // Redirect or perform other actions
        alert("Passkey Loaded!");
        window.localStorage.setItem("passkey", passkey);
        window.location.replace('members.html');
        // window.location.href = "next_page.html"
      } else {
        // Passkey does not exist
        console.log("Passkey is invalid.");
        alert("Passkey Invalid!");
        window.location.replace('index.html');
      }
    })
    .catch((error) => {
      console.error("Error validating passkey:", error);
      alert("An error occurred. Please try again.");
    });
}
