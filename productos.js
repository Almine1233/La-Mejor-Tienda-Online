const productos = [
  { id: 1, nombre: "PC Gamer", precio: 1200, categoria: "Gaming", imagen: "https://via.placeholder.com/300x200?text=PC+Gamer" },
  { id: 2, nombre: "AirPods", precio: 180, categoria: "Audio", imagen: "https://via.placeholder.com/300x200?text=AirPods" },
  { id: 3, nombre: "Altavoces Bluetooth", precio: 90, categoria: "Audio", imagen: "https://via.placeholder.com/300x200?text=Altavoces" },
  { id: 4, nombre: "Monitor 27''", precio: 250, categoria: "Gaming", imagen: "https://via.placeholder.com/300x200?text=Monitor" },
  { id: 5, nombre: "Teclado Mecánico", precio: 70, categoria: "Accesorios", imagen: "https://via.placeholder.com/300x200?text=Teclado" },
  { id: 6, nombre: "Ratón Gamer", precio: 45, categoria: "Accesorios", imagen: "https://via.placeholder.com/300x200?text=Raton" },
  { id: 7, nombre: "Silla Gaming", precio: 180, categoria: "Gaming", imagen: "https://via.placeholder.com/300x200?text=Silla" },
  { id: 8, nombre: "Tablet Android", precio: 300, categoria: "Dispositivos", imagen: "https://via.placeholder.com/300x200?text=Tablet" },
  { id: 9, nombre: "Smartwatch", precio: 150, categoria: "Dispositivos", imagen: "https://via.placeholder.com/300x200?text=Smartwatch" },
  { id: 10, nombre: "Auriculares Gaming", precio: 80, categoria: "Audio", imagen: "https://via.placeholder.com/300x200?text=Auriculares" }
];

const contenedor = document.getElementById("lista-productos");
let carrito = [];

function mostrarProductos() {
  contenedor.innerHTML = "";
  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h2>${p.nombre}</h2>
      <p><b>${p.precio} €</b></p>
      <button class="comprar">Comprar</button>
      <button class="carrito-btn" onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("carrito-total");
  lista.innerHTML = "";
  let suma = 0;
  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - ${p.precio} €`;
    lista.appendChild(li);
    suma += p.precio;
  });
  total.textContent = suma;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.getElementById("carrito-icono").addEventListener("click", () => {
  const panel = document.getElementById("carrito-panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
});

mostrarProductos();
