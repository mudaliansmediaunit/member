import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Your web app's Firebase configuration
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
const auth = getAuth(app);

const loginForm = document.getElementById("loginfor");
const emailInput = document.getElementById("log-email");
const passwordInput = document.getElementById("log-pass");
const signInButton = document.getElementById("SignInBtn");

signInButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default form submission

  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User signed in:", user);
      // Redirect to admin dashboard or perform other actions
      localStorage.setItem("adminpass", "true");
      window.location.href = "admin.html"; // Replace with your admin dashboard URL
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
      alert("Login failed. Please check your credentials."); // Or display an error message on the page
    });
});