// logout.js

// 🔐 Secure Logout Function
function logoutUser() {
  try {
    // 🧹 Clear all authentication tokens and user data
    localStorage.removeItem("ownerToken");
    localStorage.removeItem("sellerToken");
    localStorage.removeItem("customerToken");
    localStorage.removeItem("deliveryToken");

    localStorage.removeItem("ownerData");
    localStorage.removeItem("sellerData");
    localStorage.removeItem("customerData");
    localStorage.removeItem("deliveryData");

    // Optional: Clear other temp data
    localStorage.removeItem("invoiceData");
    localStorage.removeItem("labelData");

    // 🧼 Clear sessionStorage if used
    sessionStorage.clear();

    // ✅ Redirect to respective login page
    const path = window.location.pathname.toLowerCase();

    if (path.includes("owner")) {
      window.location.href = "/Owner-portal/login.html";
    } else if (path.includes("seller")) {
      window.location.href = "/Seller-portal/login.html";
    } else if (path.includes("customer")) {
      window.location.href = "/Customer-portal/login.html";
    } else if (path.includes("delivery")) {
      window.location.href = "/Delivery-portal/login.html";
    } else {
      window.location.href = "/index.html";
    }
  } catch (error) {
    alert("❌ Logout failed. Please try again.");
    console.error("Logout error:", error);
  }
}

// 🔘 Bind to Logout Button (if exists)
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn") || document.querySelector("button[onclick*='logoutCustomer']");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const confirmLogout = confirm("🚪 Are you sure you want to logout?");
      if (confirmLogout) logoutUser();
    });
  }
});
