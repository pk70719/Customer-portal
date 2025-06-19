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
