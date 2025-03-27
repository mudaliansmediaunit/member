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

function getDataWithPasskeyFromLocalStorage() {
  const passkey = localStorage.getItem("passkey"); // Retrieve passkey from local storage

  if (passkey) {
    const passkeyRef = ref(database, "members/" + passkey); // Replace "members" with your data path

    get(passkeyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Data for passkey", passkey, ":", data);
          // Use the retrieved data (e.g., display it on the page)
          displayData(data); // Call a function to display the data.
        } else {
          console.log("No data found for passkey:", passkey);
          alert("No data found for this passkey.");
        }
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
        alert("An error occurred while retrieving data.");
      });
  } else {
    console.log("Passkey not found in local storage.");
    alert("Passkey not found. Please enter a passkey.");
    window.location.replace('index.html');
  }
}

function displayData(data) {
  // Example: Display data in a div with id="dataDisplay"
  const dataDisplay = document.getElementById("dataDisplay");
  if (dataDisplay) {
    dataDisplay.innerHTML = `
      <h1>Hello, <span id="myname">${data.member_name || "N/A"}</span></h1>
      <h4>Your Passkey is : <span id="mypasskey">${data.passkey || "N/A"}</span></h4>
      <br><br>
      <p>You have earned,</p>
      <h1 id="mymarks">${data.marks || "N/A"}</h1>
      <p>marks in total.</p>
      <a href="index.html">Back to Home</a>
    `;
  }

}
getDataWithPasskeyFromLocalStorage();



