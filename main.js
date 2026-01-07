let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("productos");
const buscador = document.getElementById("buscador");
const categoriasSelect = document.getElementById("categorias");

function cargarCategorias() {
  const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];
  categoriasSelect.innerHTML = "";
  categorias.forEach(cat => {
    categoriasSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

function mostrarProductos() {
  contenedor.innerHTML = "";
  const texto = buscador.value.toLowerCase();
  const categoria = categoriasSelect.value;

  productos.forEach(p => {
    if (
      (categoria !== "Todos" && p.categoria !== categoria) ||
      !p.nombre.toLowerCase().includes(texto)
    ) return;

    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p class="precio">${p.precio} €</p>
        <button onclick="agregarCarrito('${p.nombre}')">Añadir al carrito</button>
      </div>
    `;
  });
}

function agregarCarrito(nombre) {
  const prod = productos.find(p => p.nombre === nombre);
  carrito.push(prod);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("total");
  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((p, i) => {
    suma += Number(p.precio);
    lista.innerHTML += `
      <li>
        ${p.nombre} - ${p.precio} €
        <button onclick="eliminar(${i})">❌</button>
      </li>
    `;
  });

  total.textContent = suma;
}

function eliminar(i) {
  carrito.splice(i, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

buscador.addEventListener("input", mostrarProductos);
categoriasSelect.addEventListener("change", mostrarProductos);

document.getElementById("carrito-icono").onclick = () => {
  document.getElementById("carrito-panel").classList.toggle("abierto");
};

cargarCategorias();
mostrarProductos();
actualizarCarrito();
