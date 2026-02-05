const products = [
  { id: 1, name: "Auriculares Pro", price: 89, image: "https://picsum.photos/400/300?1" },
  { id: 2, name: "Smartwatch X", price: 129, image: "https://picsum.photos/400/300?2" },
  { id: 3, name: "Teclado Mecánico", price: 99, image: "https://picsum.photos/400/300?3" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("product-grid");
const cartPanel = document.getElementById("cart-panel");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

function renderProducts() {
  if (!grid) return;
  products.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price} €</p>
        <button onclick="addToCart(${p.id})">Añadir</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  if (!cartItems) return;
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    cartItems.innerHTML += `
      <li>${item.name} - ${item.price} € 
      <button onclick="removeItem(${i})">✖</button></li>
    `;
  });

  if (cartTotal) cartTotal.textContent = total;
  if (cartCount) cartCount.textContent = cart.length;

  const checkoutTotal = document.getElementById("checkout-total");
  if (checkoutTotal) checkoutTotal.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

document.getElementById("cart-icon")?.addEventListener("click", () => {
  cartPanel.classList.toggle("hidden");
});

/* USUARIOS */
function register() {
  const u = document.getElementById("reg-user").value;
  const p = document.getElementById("reg-pass").value;
  localStorage.setItem("user", JSON.stringify({ u, p }));
  alert("Cuenta creada");
}

function login() {
  alert("Login simulado");
}

renderProducts();
updateCart();

if (!localStorage.getItem("visited")) {
  alert("👋 Bienvenido a MiMarketplace");
  localStorage.setItem("visited", "true");
}
