let cart = [];
const cartCountElement = document.getElementById("cart-count");
const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
let isLoginMode = true; // true: Đăng nhập, false: Đăng ký

function addToCart(itemName, price) {
  const existingItem = cart.find((item) => item.name === itemName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: itemName, price: price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCountElement.textContent = totalItems;
  cartItemsElement.innerHTML = "";
  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>${(item.price * item.quantity).toLocaleString()} VNĐ</span>
        `;
    cartItemsElement.appendChild(itemElement);
  });
  cartTotalElement.textContent = `Tổng tiền: ${totalPrice.toLocaleString()} VNĐ`;
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    closeModal("login-modal");
    closeModal("cart-modal");
  }
};

// Chuyển đổi giữa Đăng nhập và Đăng ký
function toggleAuthMode() {
  const title = document.getElementById("modal-title");
  const authBtn = document.getElementById("auth-btn");
  const toggleText = document.getElementById("toggle-auth");
  const emailInput = document.getElementById("email");

  if (isLoginMode) {
    title.textContent = "Đăng ký";
    authBtn.textContent = "Đăng ký";
    toggleText.innerHTML =
      'Đã có tài khoản? <a href="#" onclick="toggleAuthMode()">Đăng nhập</a>';
    emailInput.style.display = "block";
  } else {
    title.textContent = "Đăng nhập";
    authBtn.textContent = "Đăng nhập";
    toggleText.innerHTML =
      'Chưa có tài khoản? <a href="#" onclick="toggleAuthMode()">Đăng ký</a>';
    emailInput.style.display = "none";
  }
  isLoginMode = !isLoginMode;
}

// Xử lý đăng nhập/đăng ký
function handleAuth() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  if (!username || !password || (!isLoginMode && !email)) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (isLoginMode) {
    alert("Đăng nhập thành công với " + username);
  } else {
    alert("Đăng ký thành công với " + username + " và email " + email);
  }

  closeModal("login-modal");
  showMainScreen();
}

// Đăng nhập bằng Google (giả lập)
function loginWithGoogle() {
  alert("Đăng nhập bằng Google thành công!");
  closeModal("login-modal");
  showMainScreen();
}

// Đăng nhập bằng Facebook (giả lập)
function loginWithFacebook() {
  alert("Đăng nhập bằng Facebook thành công!");
  closeModal("login-modal");
  showMainScreen();
}

// Chuyển sang màn hình chính
function showMainScreen() {
  const heroText = document.querySelector(".hero-text h2");
  heroText.textContent = "Chào mừng bạn đã trở lại Bếp Nhà Khoa!";
}
