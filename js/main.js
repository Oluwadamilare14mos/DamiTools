// main.js

// --- Splash screen 2.5s ---
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  if (splash) {
    setTimeout(() => {
      splash.style.display = "none";
      document.getElementById("main").style.display = "block";
    }, 2500);
  }
});

// --- Menu toggle (hamburger) ---
function toggleMenu() {
  document.getElementById("menu").classList.toggle("open");
}

// --- Back button ---
function goBack() {
  window.history.back();
}

// --- Firebase Config ---
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
const auth = firebase.auth();
const db = firebase.firestore();

// --- Auth: Login/Register ---
function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      showProfile(user.user);
    })
    .catch(err => alert(err.message));
}

function registerUser(email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      db.collection("users").doc(user.user.uid).set({
        email: user.user.email,
        createdAt: new Date()
      });
      showProfile(user.user);
    })
    .catch(err => alert(err.message));
}

function logoutUser() {
  auth.signOut().then(() => {
    document.getElementById("userProfile").innerHTML = "Guest";
  });
}

// --- Show Profile Info in Menu ---
function showProfile(user) {
  const profile = document.getElementById("userProfile");
  if (profile) {
    profile.innerHTML = `
      <img src="${user.photoURL || 'assets/icons/profile.png'}" class="profile-pic">
      <span>${user.displayName || user.email}</span>
    `;
  }
}

// Keep auth state
auth.onAuthStateChanged(user => {
  if (user) showProfile(user);
});

// --- Product Click → Product Details ---
function openProduct(id, name, price, img) {
  localStorage.setItem("product", JSON.stringify({ id, name, price, img }));
  window.location.href = "product.html";
}

// --- Load Product Details ---
function loadProductDetails() {
  const product = JSON.parse(localStorage.getItem("product"));
  if (product) {
    document.getElementById("productName").innerText = product.name;
    document.getElementById("productPrice").innerText = "₦" + product.price;
    document.getElementById("productImg").src = product.img;
  }
}

// --- Add to Cart ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price, img, qty = 1) {
  cart.push({ id, name, price, img, qty });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart`);
}

// --- Category Logic ---
function filterCategory(category) {
  const products = document.querySelectorAll(".product-card");
  products.forEach(p => {
    if (p.dataset.category === category || category === "all") {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

// --- Payment Placeholder ---
function checkout() {
  alert("Checkout with Paystack/Flutterwave coming soon! For now, choose Pay on Delivery.");
}

// --- Contact Links ---
function openWhatsApp() {
  window.open("https://wa.me/234705470008", "_blank");
}

function openGmail() {
  window.location.href = "mailto:yourgmail@gmail.com";
}

function downloadApp() {
  window.open("https://expo.dev/accounts/oluwadamiloremose/projects/DamiTools/builds/dae29279-7512-4ffc-b646-686c42152592", "_blank");
}
