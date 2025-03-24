import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  remove,
  onValue 
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

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

//Inputs and Buttons
let addbtn = document.getElementById("memberadd");

function writeUserData() {
  let passkey = document.getElementById("passkey").value;
  let membername = document.getElementById("mname").value;
  let marks = document.getElementById("marks").value;

  const db = getDatabase();
  set(ref(db, "members/" + passkey), {
    passkey: passkey,
    member_name: membername,
    marks: marks,
  })
    .then(() => {
      alert("Record Added!");
    })
    .catch((error) => {
      alert("Something Went Wrong!!!");
      console.log(error);
    });
}

const database = getDatabase(app);
const membersRef = ref(database, "members");

let currentKey = "";

function readDataAndPopulateTable() {
  onValue(membersRef, (snapshot) => {
    const data = snapshot.val();
    const tableBody = document.getElementById("dataTableBody");
    tableBody.innerHTML = "";

    if (data) {
      Object.keys(data).forEach((key) => {
        const member = data[key];
        const row = document.createElement("tr");

        const passkeyCell = document.createElement("td");
        passkeyCell.textContent = key;
        row.appendChild(passkeyCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = member.member_name;
        row.appendChild(nameCell);

        const marksCell = document.createElement("td");
        marksCell.textContent = member.marks;
        row.appendChild(marksCell);

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("btn", "btn-primary", "btn-sm", "me-2"); // Added margin right
        editButton.addEventListener("click", () => {
          openEditModal(key, member);
        });
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteButton.addEventListener("click", () => {
          deleteMember(key);
        });
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        tableBody.appendChild(row);
      });
    } else {
      const row = document.createElement("tr");
      const noDataCell = document.createElement("td");
      noDataCell.textContent = "No data available";
      noDataCell.colSpan = 5;
      row.appendChild(noDataCell);
      tableBody.appendChild(row);
    }
  });
}

function openEditModal(key, member) {
  currentKey = key;
  document.getElementById("editPasskey").value = member.passkey;
  document.getElementById("editName").value = member.member_name;
  document.getElementById("editMarks").value = member.marks;
  const editModal = new bootstrap.Modal(document.getElementById("editModal"));
  editModal.show();
}

function saveChanges() {
  const updatedPasskey = document.getElementById("editPasskey").value;
  const updatedName = document.getElementById("editName").value;
  const updatedMarks = document.getElementById("editMarks").value;

  const updates = {};
  updates["/members/" + currentKey] = {
    passkey: updatedPasskey,
    member_name: updatedName,
    marks: updatedMarks,
  };

  update(ref(database), updates)
    .then(() => {
      const editModal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
      editModal.hide();
    })
    .catch((error) => {
      console.error("Error updating data:", error);
      alert("Error updating data. Please try again.");
    });
}

function deleteMember(key) {
  if (confirm("Are you sure you want to delete this member?")) {
    remove(ref(database, "members/" + key))
      .then(() => {
        console.log("Member deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting member:", error);
        alert("Error deleting member. Please try again.");
      });
  }
}
readDataAndPopulateTable();

let btnsave = document.getElementById('savebtn');

btnsave.addEventListener("click", saveChanges);
addbtn.addEventListener("click", writeUserData);
