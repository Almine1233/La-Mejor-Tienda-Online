// Productos iniciales
let productos = JSON.parse(localStorage.getItem("productos")) || [
  { nombre: "Auriculares Gamer", descripcion: "Con micrófono y luces LED", precio: 25, imagen: "https://via.placeholder.com/250x200?text=Auriculares" },
  { nombre: "Teclado Mecánico", descripcion: "Switches azules, retroiluminado", precio: 40, imagen: "https://via.placeholder.com/250x200?text=Teclado" },
  { nombre: "Ratón Inalámbrico", descripcion: "Ergonómico y rápido", precio: 15, imagen: "https://via.placeholder.com/250x200?text=Ratón" },
];

// Renderizar productos
function mostrarProductos() {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";
  productos.forEach((p, i) => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h2>${p.nombre}</h2>
        <p>${p.descripcion}</p>
        <p><b>${p.precio} €</b></p>
        <button class="comprar">Comprar</button>
        <button class="carrito-btn" onclick="agregarCarrito(${i})">Añadir al carrito</button>
      </div>
    `;
  });
}

// Carrito
let carrito = [];

function agregarCarrito(i) {
  carrito.push(productos[i]);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("carrito-total");
  lista.innerHTML = "";
  let suma = 0;
  carrito.forEach((p, i) => {
    lista.innerHTML += `<li>${p.nombre} - ${p.precio}€ <button onclick="eliminarCarrito(${i})">❌</button></li>`;
    suma += p.precio;
  });
  total.textContent = suma;
}

function eliminarCarrito(i) {
  carrito.splice(i, 1);
  actualizarCarrito();
}

// Carrito toggle
document.getElementById("carrito-icono").addEventListener("click", () => {
  const panel = document.getElementById("carrito-panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
});

mostrarProductos();

