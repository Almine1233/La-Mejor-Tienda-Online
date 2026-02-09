const products = JSON.parse(localStorage.getItem("products")) || [
  {
    id: 1,
    name: "Auriculares Pro",
    price: 89,
    image: "https://picsum.photos/400/300?1",
    seller: "admin"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("product-grid");

function renderProducts() {
  if (!grid) return;
  grid.innerHTML = "";

  products.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">${p.price} €</p>

        <a class="seller" href="perfil.html?u=${p.seller}">
          👤 ${p.seller}
        </a>

        <button onclick="addToCart(${p.id})">Añadir</button>
        <button onclick="toggleLike(${p.id})">
          ❤️ ${countLikes(p.id)}
        </button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = cart.length;
}

renderProducts();
updateCartCount();

if (!localStorage.getItem("visited")) {
  alert("👋 Bienvenido a MiMarketplace\nCompra, vende o haz ambas cosas.");
  localStorage.setItem("visited", "true");
}
