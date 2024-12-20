// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
    "sahildinesh.zambre2023@vitstudent.ac.in",
    "rohit.lalbahadur2023@vitstudent.ac.in"
];

// Elements
const studentsList = document.getElementById("students-list");
const accessMessage = document.getElementById("access-message");
const logoutBtn = document.getElementById("logout-btn");
const totalCount = document.getElementById("total-count");

// Disable caching of this page
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../control Panel/service-worker.js', { scope: '/control Panel/' })
        .then(registration => {
            console.log('Service worker registered.');
        })
        .catch(error => {
            console.log('Service worker registration failed:', error);
        });
}


// Prevent navigating back to the dashboard after logout
window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};

// Check authentication state on page load
onAuthStateChanged(auth, (user) => {
    if (user && allowedEmails.includes(user.email)) {
        accessMessage.textContent = `Welcome, ${user.displayName || "Admin"}!`;
        fetchStudents();
    } else {
        // Redirect to login if user is not authorized
        window.location.href = "../control Panel/login.html";
    }
});

// Logout button event listener
logoutBtn.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            window.location.href = "../control Panel/login.html";
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
});

// Function to fetch students from Firestore
async function fetchStudents() {
    try {
        const querySnapshot = await getDocs(collection(db, "VITstudents"));
        const students = [];

        querySnapshot.forEach((doc) => {
            const studentData = doc.data();
            students.push(studentData);
        });

        // Sort the students alphabetically by name
        students.sort((a, b) => a.name.localeCompare(b.name));

        // Clear previous student list
        studentsList.innerHTML = "";

        // Display each student
        let userCount = 0;
        students.forEach((student) => {
            displayStudent(student);
            userCount++;
        });

        // Update total registered users count
        totalCount.textContent = userCount;
    } catch (error) {
        console.error("Error fetching students:", error);
        accessMessage.textContent = "Error fetching student data.";
    }
}

// Function to display student information
function displayStudent(student) {
    const studentCard = document.createElement("div");
    studentCard.classList.add("student-card");

    // Initial hidden password state
    let passwordVisible = false;

    // Create HTML structure with toggle button for password visibility
    studentCard.innerHTML = `
        <h3>${student.name}</h3>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Phone:</strong> ${student.phone}</p>
        <p><strong>Password:</strong> <span id="password-${student.email}">${'*'.repeat(student.password.length)}</span></p>
        <button class="toggle-password" data-email="${student.email}">Show Password</button>
    `;

    studentsList.appendChild(studentCard);

    // Add event listener for password visibility toggle
    const toggleButton = studentCard.querySelector(".toggle-password");
    toggleButton.addEventListener("click", () => {
        passwordVisible = !passwordVisible;
        const passwordSpan = document.getElementById(`password-${student.email}`);
        
        if (passwordVisible) {
            passwordSpan.textContent = student.password;
            toggleButton.textContent = "Hide Password";
        } else {
            passwordSpan.textContent = '*'.repeat(student.password.length);
            toggleButton.textContent = "Show Password";
        }
    });
}
