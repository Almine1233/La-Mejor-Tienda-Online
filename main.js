let productos = [];
let carrito = [];

fetch("productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarProductos(productos);
  });

function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <strong>${p.precio} €</strong>
        <button onclick="agregarCarrito(${p.id})">Añadir al carrito</button>
      </div>
    `;
  });
}

function agregarCarrito(id) {
  carrito.push(id);
  document.getElementById("contador").textContent = carrito.length;
}

document.getElementById("buscador").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  mostrarProductos(productos.filter(p => p.nombre.toLowerCase().includes(texto)));
});

function filtrarCategoria(cat) {
  if (cat === "Todas") mostrarProductos(productos);
  else mostrarProductos(productos.filter(p => p.categoria === cat));
}
