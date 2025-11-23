// main.js - necesita cargar productos.js antes
const grid = document.getElementById('productos');
const carritoIcon = document.getElementById('carrito-icono');
const carritoPanel = document.getElementById('carrito-panel');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const comprarTodoBtn = document.getElementById('comprar-todo');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Render productos
function renderProducts(list = productos) {
  grid.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p class="desc">${p.descripcion}</p>
      <div class="precio">${p.precio.toFixed(2)} €</div>
      <div class="actions">
        <button class="btn btn-comprar" onclick="verProducto(${p.id})">Detalles / Comprar</button>
        <button class="btn btn-carrito" onclick="addToCart(${p.id})">Añadir al carrito</button>
      </div>
    `;
    grid.appendChild(div);
  });
}

// Filtro por categoria
function filtrarProductos(cat) {
  if (cat === 'todos') renderProducts(productos);
  else renderProducts(productos.filter(p => p.categoria === cat));
}

// Buscador
function buscarProductos() {
  const q = document.getElementById('q').value.toLowerCase();
  if (!q) return renderProducts();
  const res = productos.filter(p => (p.nombre + ' ' + p.descripcion + ' ' + p.categoria).toLowerCase().includes(q));
  renderProducts(res);
}

// Carrito
function addToCart(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  const found = carrito.find(i => i.id === id);
  if (found) found.cantidad++;
  else carrito.push({...p, cantidad:1});
  saveCart();
  alert(`${p.nombre} añadido al carrito ✅`);
}

function saveCart() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  updateCartUI();
}

function updateCartUI() {
  carritoLista.innerHTML = '';
  let total = 0;
  carrito.forEach((it, idx) => {
    total += it.precio * (it.cantidad || 1);
    const li = document.createElement('li');
    li.innerHTML = `<span>${it.nombre} x${it.cantidad || 1}</span><span>${(it.precio * (it.cantidad || 1)).toFixed(2)} €</span>
      <div style="margin-top:6px"><button onclick="removeItem(${idx})">Eliminar</button></div>`;
    carritoLista.appendChild(li);
  });
  carritoTotal.textContent = total.toFixed(2);
}

function removeItem(index) {
  carrito.splice(index,1);
  saveCart();
}

// Toggle carrito panel
carritoIcon.addEventListener('click', () => {
  carritoPanel.style.display = carritoPanel.style.display === 'block' ? 'none' : 'block';
});

// Comprar todo -> guardar carrito y abrir comprar.html
comprarTodoBtn.addEventListener('click', () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  window.location.href = 'comprar.html';
});

// Ver detalles y comprar: guarda producto y abre producto.html
function verProducto(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  localStorage.setItem('productoSeleccionado', JSON.stringify(p));
  window.location.href = 'producto.html';
}

// Al iniciar
renderProducts();
updateCartUI();
