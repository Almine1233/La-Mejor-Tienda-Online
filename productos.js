let productos = JSON.parse(localStorage.getItem("productos")) || [
  { nombre: "Auriculares Gamer", descripcion: "Con micrófono y luces LED RGB", precio: 29, categoria: "Gaming", imagen: "https://m.media-amazon.com/images/I/71r5pFwq1cL._AC_SL1500_.jpg" },
  { nombre: "Teclado Mecánico", descripcion: "Retroiluminado RGB, switches azules", precio: 45, categoria: "Gaming", imagen: "https://m.media-amazon.com/images/I/81d0k2vsm+L._AC_SL1500_.jpg" },
  { nombre: "Ratón Inalámbrico", descripcion: "Sensor preciso y diseño ergonómico", precio: 19, categoria: "Accesorios", imagen: "https://m.media-amazon.com/images/I/61B8wzFf5mL._AC_SL1500_.jpg" },
  { nombre: "Monitor 24'' Full HD", descripcion: "Pantalla IPS con 75Hz", precio: 120, categoria: "Dispositivos", imagen: "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SL1500_.jpg" },
  { nombre: "Silla Gamer", descripcion: "Ergonómica con soporte lumbar", precio: 150, categoria: "Gaming", imagen: "https://m.media-amazon.com/images/I/71g1N5D3LPL._AC_SL1500_.jpg" },
  { nombre: "Torre de PC", descripcion: "PC Gaming Ryzen 5 + RTX 3060", precio: 950, categoria: "Dispositivos", imagen: "https://m.media-amazon.com/images/I/71tHKT+7h-L._AC_SL1500_.jpg" },
  { nombre: "AirPods Pro", descripcion: "Auriculares inalámbricos con cancelación de ruido", precio: 229, categoria: "Audio", imagen: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg" },
  { nombre: "Altavoces Bluetooth", descripcion: "Sonido estéreo y batería de larga duración", precio: 59, categoria: "Audio", imagen: "https://m.media-amazon.com/images/I/71cQWYVtc+L._AC_SL1500_.jpg" },
  { nombre: "Tablet 10''", descripcion: "Pantalla HD, 4GB RAM, 64GB almacenamiento", precio: 180, categoria: "Dispositivos", imagen: "https://m.media-amazon.com/images/I/71t6xY4a4+L._AC_SL1500_.jpg" },
  { nombre: "Smartwatch", descripcion: "Reloj inteligente con monitor de salud y notificaciones", precio: 75, categoria: "Accesorios", imagen: "https://m.media-amazon.com/images/I/71E6pGrvC3L._AC_SL1500_.jpg" },
];

// Renderizar productos
function mostrarProductos(lista = productos) {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";
  lista.forEach((p, i) => {
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

// Filtro por categoría
function filtrarProductos(categoria) {
  if (categoria === "todos") {
    mostrarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    mostrarProductos(filtrados);
  }
}

// Carrito (igual que antes)
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
document.getElementById("carrito-icono").addEventListener("click", () => {
  const panel = document.getElementById("carrito-panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
});

// Mostrar productos al cargar
mostrarProductos();
