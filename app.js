const products = [
  {
    id: 1,
    name: "Auriculares Pro",
    price: 89,
    image: "https://picsum.photos/400/300?1"
  },
  {
    id: 2,
    name: "Smartwatch X",
    price: 129,
    image: "https://picsum.photos/400/300?2"
  },
  {
    id: 3,
    name: "Teclado Mecánico",
    price: 99,
    image: "https://picsum.photos/400/300?3"
  }
];

const grid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <div class="price">${p.price} €</div>
      <button onclick="addToCart(${p.id})">Añadir</button>
    `;
    grid.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price} €
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total;
  cartCount.textContent = cart.length;

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", total);
}

renderProducts();
updateCart();
