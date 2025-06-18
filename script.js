// ✅ Customer Portal Script – D1 to D25
const BASE_URL = "https://suriyawan-saffari-backend.onrender.com";

// ✅ D1: DOM Load
document.addEventListener("DOMContentLoaded", () => {
  setWelcome("🛒 Welcome to Suriyawan Saffari!");
  setStatus("🔗 Connecting...");

  loadProducts();       // D2
  loadCustomerInfo();   // D3
  setupHelpDesk();      // D8–D11
});

// ✅ D2: Load Products
function loadProducts() {
  fetch(`${BASE_URL}/api/customer/products`)
    .then(res => res.json())
    .then(data => {
      showProducts(data.products || []);
      setStatus("✅ Products loaded");
    })
    .catch(() => setStatus("❌ Failed to load products"));
}

// ✅ D3: Load Customer Info
function loadCustomerInfo() {
  fetch(`${BASE_URL}/api/customer/info`, {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      setWelcome(`Hello, ${data.name || "Customer"} 👋`);
    })
    .catch(() => setWelcome("Welcome Guest!"));
}

// ✅ D4: Show Products
function showProducts(products = []) {
  const container = document.createElement("div");
  container.className = "product-list";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${product.name}</h2>
      <p>₹${product.price}</p>
      <button onclick="orderProduct('${product._id}')">🛍 Order Now</button>
    `;
    container.appendChild(card);
  });

  document.body.appendChild(container);
}

// ✅ D5: Order Product
function orderProduct(productId) {
  if (!confirm("Place order for this item?")) return;

  fetch(`${BASE_URL}/api/customer/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      alert("✅ Order placed! Order ID: " + data.orderId);
    })
    .catch(() => alert("❌ Failed to place order"));
}

// ✅ D6: Referral Info
function showReferralInfo() {
  alert("Refer & Earn ₹10 after your first delivery!");
}

// ✅ D7: Track Order
function trackOrder(orderId) {
  fetch(`${BASE_URL}/api/customer/track/${orderId}`, {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      alert(`📦 Status for Order #${orderId}: ${data.status}`);
    })
    .catch(() => alert("❌ Could not track order"));
}

// ✅ D8–D11: AI Help Chat (Renamed to Help Desk)
function setupHelpDesk() {
  const box = document.createElement("div");
  box.id = "helpdesk";
  box.style = "margin:20px;padding:10px;border:1px solid #ccc;border-radius:10px;width:90%;max-width:400px;";
  box.innerHTML = `
    <h3>📞 Suriyawan Saffari Help Desk</h3>
    <input type="text" id="chatInput" placeholder="Ask a question..." style="width:70%;padding:5px;">
    <button onclick="askHelpDesk()">Send</button>
    <div id="chatResponse" style="margin-top:10px;color:#333;"></div>
  `;
  document.body.appendChild(box);
}

function askHelpDesk() {
  const query = document.getElementById("chatInput").value;
  if (!query) return;

  document.getElementById("chatResponse").innerText = "⏳ Typing...";

  fetch(`${BASE_URL}/api/helpdesk/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: query })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("chatResponse").innerText = "💬 " + data.reply;
    })
    .catch(() => {
      document.getElementById("chatResponse").innerText = "❌ Failed to get response.";
    });
}

// ✅ D12: Logout
function logoutCustomer() {
  fetch(`${BASE_URL}/api/customer/logout`, {
    method: "POST",
    credentials: "include"
  }).then(() => {
    alert("🔒 Logged out successfully.");
    location.reload();
  });
}

// ✅ D13: Wishlist (Placeholder)
function openWishlist() {
  alert("📝 Wishlist coming soon!");
}

// ✅ D14: Wallet (Placeholder)
function openWallet() {
  alert("💰 Wallet feature coming soon!");
}

// ✅ D15: Offers (Placeholder)
function viewOffers() {
  alert("🎁 No offers currently available.");
}

// ✅ D16: Feedback (Placeholder)
function giveFeedback() {
  const fb = prompt("📣 Share your feedback:");
  if (fb) alert("✅ Thank you for your feedback!");
}

// ✅ D17: Set Welcome Text
function setWelcome(text) {
  const el = document.getElementById("welcome-msg");
  if (el) el.innerText = text;
}

// ✅ D18: Set Status
function setStatus(text) {
  const el = document.getElementById("status-msg");
  if (el) el.innerText = text;
}

// ✅ D19: Login Customer
function loginCustomer() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const messageBox = document.getElementById("loginMessage");

  if (!email || !password) {
    messageBox.innerText = "⚠️ Please enter both fields.";
    return;
  }

  fetch(`${BASE_URL}/api/customer/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        messageBox.innerText = "✅ Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else {
        messageBox.innerText = "❌ " + (data.message || "Login failed.");
      }
    })
    .catch(() => {
      messageBox.innerText = "❌ Server error. Please try again.";
    });
}

// ✅ D20: Page Navigation
function navigate(page) {
  alert(`🔀 Navigating to ${page}.html`);
  window.location.href = `${page}.html`;
}

// ✅ D21–D25: Future Enhancements Placeholder
// - Address book
// - Order history
// - Live support
// - Cancel order
// - Gift cards, etc.
