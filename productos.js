// Productos iniciales con imágenes reales
let productos = JSON.parse(localStorage.getItem("productos")) || [
  { nombre: "Auriculares Gamer", descripcion: "Con micrófono y luces LED RGB", precio: 29, imagen: "https://m.media-amazon.com/images/I/71r5pFwq1cL._AC_SL1500_.jpg" },
  { nombre: "Teclado Mecánico", descripcion: "Retroiluminado RGB, switches azules", precio: 45, imagen: "https://m.media-amazon.com/images/I/81d0k2vsm+L._AC_SL1500_.jpg" },
  { nombre: "Ratón Inalámbrico", descripcion: "Sensor preciso y diseño ergonómico", precio: 19, imagen: "https://m.media-amazon.com/images/I/61B8wzFf5mL._AC_SL1500_.jpg" },
  { nombre: "Monitor 24'' Full HD", descripcion: "Pantalla IPS con 75Hz", precio: 120, imagen: "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SL1500_.jpg" },
  { nombre: "Silla Gamer", descripcion: "Ergonómica con soporte lumbar", precio: 150, imagen: "https://m.media-amazon.com/images/I/71g1N5D3LPL._AC_SL1500_.jpg" },
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

