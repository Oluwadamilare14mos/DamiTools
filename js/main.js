// ===== SPLASH SCREEN =====
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
  }, 2500); // 2.5 seconds
});

// ===== FIREBASE CONFIG =====
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
const db = firebase.firestore();
const auth = firebase.auth();

// ===== SAMPLE CART =====
let cart = [];

function addToCart(productId, name, price) {
  cart.push({ productId, name, price });
  alert(`${name} added to cart!`);
  updateCartCount();
}

function updateCartCount() {
  const cartBtn = document.querySelector(".cart-btn");
  if (cartBtn) {
    cartBtn.innerText = `Cart (${cart.length})`;
  }
}

// ===== CATEGORY CLICK =====
function showCategory(category) {
  alert(`Showing products for ${category}`);
  // Later we will fetch from Firestore
}

// ===== BACK BUTTON =====
window.onpopstate = function () {
  if (document.referrer !== "") {
    window.history.back();
  }
};

// ===== LOGIN SYSTEM PLACEHOLDER =====
function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      alert("Logged in successfully");
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
}

// ===== PAYMENT PLACEHOLDER =====
function payNow(amount) {
  alert(`Payment gateway will handle ₦${amount}`);
}
