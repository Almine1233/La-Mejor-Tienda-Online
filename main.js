const productos = [
  { id:1, nombre:"AirPods Pro", precio:249, categoria:"Tecnología", img:"https://images.unsplash.com/photo-1585386959984-a41552231693" },
  { id:2, nombre:"Torre Gaming", precio:1199, categoria:"Tecnología", img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7" },
  { id:3, nombre:"Altavoz Bluetooth", precio:89, categoria:"Tecnología", img:"https://images.unsplash.com/photo-1612444530582-fc66183b16f0" },
  { id:4, nombre:"Zapatillas deportivas", precio:99, categoria:"Moda", img:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77" },
  { id:5, nombre:"Reloj elegante", precio:199, categoria:"Moda", img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30" }
];

let carrito = [];

const contenedor = document.getElementById("productos");
const carritoIcono = document.getElementById("carrito-icono");
const carritoPanel = document.getElementById("carrito-panel");
const carritoLista = document.getElementById("carrito-lista");
const totalSpan = document.getElementById("total");
const categoriasDiv = document.getElementById("categorias");

function mostrarProductos(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.img}">
        <h3>${p.nombre}</h3>
        <p>${p.precio} €</p>
        <button onclick="agregar(${p.id})">Añadir al carrito</button>
      </div>
    `;
  });
}

function agregar(id) {
  const prod = productos.find(p => p.id === id);
  carrito.push(prod);
  actualizarCarrito();
}

function actualizarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;
  carrito.forEach((p, i) => {
    total += p.precio;
    carritoLista.innerHTML += `
      <li>${p.nombre} <span onclick="quitar(${i})">✖</span></li>
    `;
  });
  totalSpan.textContent = total;
}

function quitar(i) {
  carrito.splice(i,1);
  actualizarCarrito();
}

carritoIcono.onclick = () => {
  carritoPanel.style.display =
    carritoPanel.style.display === "block" ? "none" : "block";
};

// Categorías
[...new Set(productos.map(p=>p.categoria))].forEach(cat=>{
  categoriasDiv.innerHTML += `<div onclick="filtrar('${cat}')">${cat}</div>`;
});

function filtrar(cat){
  mostrarProductos(productos.filter(p=>p.categoria===cat));
}

mostrarProductos(productos);
