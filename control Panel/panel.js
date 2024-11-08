// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0UAvyj2f6oX0Bi6t52pi-5EBERI7oFDU",
    authDomain: "earthlanding-21773.firebaseapp.com",
    projectId: "earthlanding-21773",
    storageBucket: "earthlanding-21773.firebasestorage.app",
    messagingSenderId: "591653055766",
    appId: "1:591653055766:web:b9e55cdaf6c2a9ae407437"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Allowed email addresses
const allowedEmails = [
    "raybanpranav.mahesh2023@vitstudent.ac.in",
    "rohit.lalbahadur2023@vitstudent.ac.in"
];

// Elements
const studentsList = document.getElementById("students-list");
const accessMessage = document.getElementById("access-message");

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user && allowedEmails.includes(user.email)) {
        accessMessage.textContent = `Welcome, ${user.displayName}!`;
        fetchStudents();
    } else {
        signInWithGoogle();
    }
});

// Function to sign in with Google
function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            if (!allowedEmails.includes(user.email)) {
                accessMessage.textContent = "Access Denied. You are not authorized to view this page.";
                studentsList.innerHTML = "";
            }
        })
        .catch((error) => {
            console.error("Error signing in:", error);
            accessMessage.textContent = "Error signing in. Please try again.";
        });
}

// Function to fetch students from Firestore
async function fetchStudents() {
    try {
        const querySnapshot = await getDocs(collection(db, "VITstudents"));
        studentsList.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const studentData = doc.data();
            displayStudent(studentData);
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        accessMessage.textContent = "Error fetching student data.";
    }
}

// Function to display student information
function displayStudent(student) {
    const studentCard = document.createElement("div");
    studentCard.classList.add("student-card");
    studentCard.innerHTML = `
        <h3>${student.name}</h3>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Phone:</strong> ${student.phone}</p>
    `;
    studentsList.appendChild(studentCard);
}
