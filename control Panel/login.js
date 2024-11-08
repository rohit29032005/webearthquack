// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const auth = getAuth(app);

// Allowed admin emails
const allowedEmails = [
    "raybanpranav.mahesh2023@vitstudent.ac.in",
    "rohit.lalbahadur2023@vitstudent.ac.in"
];

// DOM Elements
const loginForm = document.getElementById("login-form");
const errorPopup = document.getElementById("error-popup");
const errorMessage = document.getElementById("error-message");

// Function to show error pop-up
function showErrorPopup(message) {
    errorMessage.textContent = message;
    errorPopup.style.display = "block";
    setTimeout(() => {
        errorPopup.style.display = "none";
    }, 4000); // Hide after 4 seconds
}

// Login Form Submit Event
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if email is allowed
    if (!allowedEmails.includes(email)) {
        showErrorPopup("Access denied. You are not authorized to log in.");
        return;
    }

    try {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);
        showErrorPopup("Login successful!");
        
        // Redirect to the admin dashboard or another protected page
        window.location.href = "../control Panel/controladmin.html"; // Update with your protected page URL
    } catch (error) {
        console.error("Login error:", error);
        showErrorPopup("Invalid email or password. Please try again.");
    }
});
