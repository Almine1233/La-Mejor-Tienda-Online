// USUARIO
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// PRODUCTOS
let products = JSON.parse(localStorage.getItem("products")) || [
  {
    id: 1,
    name: "Auriculares Pro",
    price: 89,
    image: "https://picsum.photos/400/300?1",
    seller: "admin"
  },
  {
    id: 2,
    name: "Smartwatch X",
    price: 129,
    image: "https://picsum.photos/400/300?2",
    seller: "admin"
  }
];

// CARRITO
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

function renderProducts() {
  if (!grid) return;
  grid.innerHTML = "";
  products.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">${p.price} €</p>
        <small>Vendido por ${p.seller}</small>
        <button onclick="addToCart(${p.id})">Añadir</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    cartItems.innerHTML += `
      <li>${item.name} <button onclick="removeItem(${i})">✖</button></li>
    `;
  });

  cartTotal.textContent = total;
  cartCount.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

renderProducts();
updateCart();

// BIENVENIDA
if (!localStorage.getItem("visited")) {
  alert("👋 Bienvenido a MiMarketplace");
  localStorage.setItem("visited", "true");
}
