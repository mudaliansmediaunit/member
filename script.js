// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Sa0PMmh8LK5F-liz7CDR-aENyW85Mdg",
  authDomain: "mmumarks.firebaseapp.com",
  projectId: "mmumarks",
  storageBucket: "mmumarks.firebasestorage.app",
  messagingSenderId: "970177041618",
  appId: "1:970177041618:web:81b1e00d0b80ed2380c90b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

window.recaptchaVerifier = new RecaptchaVerifier(auth, "send", {
  size: "invisible",
  callback: (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  },
});
//phoneAuth();
//codecheck();
var verifybtn = document.getElementById("verify");
// Client-side rate limiting (example)
let sendButton = document.getElementById("send");
let canSend = true;

sendButton.addEventListener("click", () => {
  if (!canSend) {
    alert("Please wait before requesting another code.");
    return;
  }

  const phoneNumber = document.getElementById("number").value.trim();
  const phoneRegex = /^\+\d{1,3}\d{1,14}$/; // E.164 format regex

  if (!phoneRegex.test(phoneNumber)) {
    alert("Please enter a valid phone number in E.164 format.");
    return;
  }

  canSend = false; // Disable the button
  sendButton.disabled = true;
  sendButton.style.backgroundColor = "gray";

  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      document.getElementById("verifier").style.display = "block";
      document.getElementById("sender").style.display = "none";
      window.confirmationResult = confirmationResult;
    })
    .catch((error) => {
      console.log("sms not sent!!");
      console.log(error);
      window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId);
      });
    })
    .finally(() => {
      // Re-enable the button after a delay
      setTimeout(() => {
        canSend = true;
        sendButton.disabled = false;
        sendButton.style.backgroundColor = ""; // Reset color
      }, 10000); // Wait 60 seconds
    });
});

//const phoneNumber = document.getElementById("number").value;

// sendbtn.addEventListener("click", () => {
//   const phoneNumber = document.getElementById("number").value.trim();
//   const phoneRegex = /^\+\d{1,3}\d{1,14}$/; // E.164 format regex

//   if (!phoneRegex.test(phoneNumber)) {
//     alert("Please enter a valid phone number in E.164 format.");
//     return;
//   }
//   console.log("working");
//   const appVerifier = window.recaptchaVerifier;
//   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//     .then((confirmationResult) => {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       document.getElementById("verifier").style.display = "block";
//       document.getElementById("sender").style.display = "none";
//       window.confirmationResult = confirmationResult;
//       // ...
//     })
//     .catch((error) => {
//       // Error; SMS not sent
//       console.log("sms not sent!!");
//       console.log(error);
//       // Or, if you haven't stored the widget ID:
//       window.recaptchaVerifier.render().then(function (widgetId) {
//         grecaptcha.reset(widgetId);
//       });
//       // ...
//     });
// });

verifybtn.addEventListener("click", () => {
  const code = document.getElementById("verificationcode").value;
  if (window.confirmationResult) {
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        document.getElementById("suc").style.display = "block";
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        document.getElementById("err").style.display = "block";
      });
  } else {
    // Handle the case where confirmationResult is not defined
    console.log("Please send the OTP first.");
    alert("Please send the OTP before verifying.");
  }
});
