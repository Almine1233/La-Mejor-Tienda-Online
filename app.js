const products = [
  { id: 1, name: "Auriculares Pro", price: 89, image: "https://picsum.photos/400/300?1" },
  { id: 2, name: "Smartwatch X", price: 129, image: "https://picsum.photos/400/300?2" },
  { id: 3, name: "Teclado Mecánico", price: 99, image: "https://picsum.photos/400/300?3" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");

/* RENDER PRODUCTOS */
function renderProducts() {
  if (!grid) return;

  grid.innerHTML = "";
  products.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <div class="price">${p.price} €</div>
        <button onclick="addToCart(${p.id})">Añadir al carrito</button>
      </div>
    `;
  });
}

/* CARRITO */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  if (cartCount) cartCount.textContent = cart.length;
}

/* BIENVENIDA */
if (!localStorage.getItem("visited")) {
  setTimeout(() => {
    alert("👋 Bienvenido a MiMarketplace\nCompra, vende o haz ambas cosas.");
  }, 500);
  localStorage.setItem("visited", "true");
}

renderProducts();
updateCartUI();
