const productos = [
  { id: 1, nombre: "PC Gamer", precio: 1200, descripcion: "Torre potente para gaming.", imagen: "https://via.placeholder.com/280x200?text=PC+Gamer" },
  { id: 2, nombre: "AirPods", precio: 150, descripcion: "Auriculares inalámbricos Apple.", imagen: "https://via.placeholder.com/280x200?text=AirPods" },
  { id: 3, nombre: "Altavoces", precio: 80, descripcion: "Sonido potente y envolvente.", imagen: "https://via.placeholder.com/280x200?text=Altavoces" },
  { id: 4, nombre: "Teclado Mecánico", precio: 60, descripcion: "Switches rojos, ideal para gamers.", imagen: "https://via.placeholder.com/280x200?text=Teclado" },
  { id: 5, nombre: "Ratón Gamer", precio: 40, descripcion: "Ratón ergonómico con luces RGB.", imagen: "https://via.placeholder.com/280x200?text=Raton" },
  { id: 6, nombre: "Monitor 144Hz", precio: 250, descripcion: "Pantalla gaming fluida.", imagen: "https://via.placeholder.com/280x200?text=Monitor" },
  { id: 7, nombre: "Tablet", precio: 200, descripcion: "Ideal para estudiar y ocio.", imagen: "https://via.placeholder.com/280x200?text=Tablet" },
  { id: 8, nombre: "Smartwatch", precio: 100, descripcion: "Tu asistente de salud en la muñeca.", imagen: "https://via.placeholder.com/280x200?text=Reloj" },
  { id: 9, nombre: "Cascos Gaming", precio: 90, descripcion: "Audio 7.1 para una mejor experiencia.", imagen: "https://via.placeholder.com/280x200?text=Cascos" },
  { id: 10, nombre: "Silla Gamer", precio: 180, descripcion: "Comodidad extrema para largas horas.", imagen: "https://via.placeholder.com/280x200?text=Silla" }
];

const lista = document.getElementById("lista-productos");
productos.forEach(p => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}">
    <h2>${p.nombre}</h2>
    <p>${p.descripcion}</p>
    <p><b>${p.precio} €</b></p>
    <img src="data:image/jpeg;base64, /9j/4AAQSkZJRgABAQAAAQABAAD..." alt="Comprar" class="boton-comprar" onclick="verProducto(${p.id})">
    <button class="carrito-btn" onclick="agregarCarrito(${p.id})">Añadir al carrito</button>
  `;
  lista.appendChild(div);
});

// Carrito
let carrito = [];
function agregarCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  const listaCarrito = document.getElementById("carrito-lista");
  const total = document.getElementById("carrito-total");
  listaCarrito.innerHTML = "";
  let suma = 0;
  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - ${p.precio} €`;
    listaCarrito.appendChild(li);
    suma += p.precio;
  });
  total.textContent = suma;
}

document.getElementById("carrito-icono").addEventListener("click", () => {
  const panel = document.getElementById("carrito-panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
});

// Ir a detalles
function verProducto(id) {
  localStorage.setItem("productoSeleccionado", JSON.stringify(productos.find(p => p.id === id)));
  window.location.href = "producto.html";
}

// Comprar todo
function finalizarCompra() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  window.location.href = "checkout.html";
}

