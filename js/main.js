// ===============================
// Splash Screen Hide
// ===============================
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  setTimeout(() => {
    splash.style.display = "none";
  }, 2500);
});

// ===============================
// Side Menu Toggle
// ===============================
const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");
const closeMenu = document.getElementById("close-menu");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  sideMenu.classList.remove("active");
});

// ===============================
// Firebase Setup
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyA2lx1hb2qZsYaXrQhsUp7hepYu5nY3fgs",
  authDomain: "damitools.firebaseapp.com",
  projectId: "damitools",
  storageBucket: "damitools.firebasestorage.app",
  messagingSenderId: "875796385681",
  appId: "1:875796385681:android:563ffc58665bdc94875430"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ===============================
// Firebase Authentication
// ===============================
const provider = new firebase.auth.GoogleAuthProvider();
const userProfile = document.getElementById("user-profile");

function updateUserUI(user) {
  if (user) {
    userProfile.innerHTML = `
      <img src="${user.photoURL || 'assets/images/default-avatar.png'}" alt="Profile">
      <h3>${user.displayName}</h3>
      <p>${user.email}</p>
      <button onclick="logout()">Logout</button>
    `;
  } else {
    userProfile.innerHTML = `
      <button onclick="login()">Login with Google</button>
    `;
  }
}

function login() {
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      updateUserUI(result.user);
    })
    .catch(error => {
      console.error("Login error:", error.message);
    });
}

function logout() {
  firebase.auth().signOut().then(() => {
    updateUserUI(null);
  });
}

// Listen for state changes
firebase.auth().onAuthStateChanged(user => {
  updateUserUI(user);
});

// ===============================
// Product Click (future expansion)
// ===============================
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    alert("Open product details here (3 images, description, similar items).");
  });
});
