// ✅ DamiTools Firebase Authentication System
// Works for: login.html, signup.html, forgot-password.html

// 🔹 Firebase config (matches your current project)
const firebaseConfig = {
  apiKey: "AIzaSyA2lx1hb2qZsYaXrQhsUp7hepYu5nY3fgs",
  authDomain: "damitools.firebaseapp.com",
  projectId: "damitools",
  storageBucket: "damitools.firebasestorage.app",
  messagingSenderId: "875796385681",
  appId: "1:875796385681:web:563ffc58665bdc94875430"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


// 🔹 Handle SIGN UP
async function signUpUser() {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const message = document.getElementById("message");

  try {
    if (email && password) {
      await auth.createUserWithEmailAndPassword(email, password);
      message.textContent = "✅ Account created successfully!";
      message.style.color = "#10b981";
      setTimeout(() => (window.location = "login.html"), 1500);
    } else {
      message.textContent = "❌ Please fill in all fields.";
      message.style.color = "#f87171";
    }
  } catch (error) {
    message.textContent = error.message;
    message.style.color = "#f87171";
  }
}


// 🔹 Handle LOGIN
async function loginUser() {
  const emailOrPhone = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const message = document.getElementById("message");

  if (!emailOrPhone || !password) {
    message.textContent = "Please fill in both fields.";
    message.style.color = "#f87171";
    return;
  }

  try {
    if (emailOrPhone.includes("@")) {
      await auth.signInWithEmailAndPassword(emailOrPhone, password);
    } else {
      message.textContent = "📱 Phone login to be added via OTP verification.";
      message.style.color = "#facc15";
      return;
    }

    message.textContent = "✅ Login successful!";
    message.style.color = "#10b981";
    setTimeout(() => (window.location = "dashboard.html"), 1500);

  } catch (error) {
    message.textContent = "❌ " + error.message;
    message.style.color = "#f87171";
  }
}


// 🔹 Handle FACEBOOK LOGIN
async function loginWithFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  const message = document.getElementById("message");

  try {
    await auth.signInWithPopup(provider);
    message.textContent = "✅ Facebook login successful!";
    message.style.color = "#10b981";
    setTimeout(() => (window.location = "dashboard.html"), 1500);
  } catch (error) {
    message.textContent = "❌ " + error.message;
    message.style.color = "#f87171";
  }
}


// 🔹 Handle PASSWORD RESET
async function resetPassword() {
  const email = document.getElementById("email")?.value.trim();
  const message = document.getElementById("message");

  if (!email) {
    message.textContent = "Enter your email address.";
    message.style.color = "#f87171";
    return;
  }

  try {
    await auth.sendPasswordResetEmail(email);
    message.textContent = "✅ Password reset link sent to your email.";
    message.style.color = "#10b981";
  } catch (error) {
    message.textContent = "❌ " + error.message;
    message.style.color = "#f87171";
  }
}


// 🔹 Logout (optional use)
function logoutUser() {
  auth.signOut().then(() => (window.location = "login.html"));
}
