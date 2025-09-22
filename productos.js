const productos = [
  { id:1, nombre:"Camiseta", descripcion:"Camiseta de algodón 100%", precio:15, imagen:"https://picsum.photos/300/200?random=1" },
  { id:2, nombre:"Zapatillas", descripcion:"Zapatillas deportivas cómodas", precio:45, imagen:"https://picsum.photos/300/200?random=2" },
  { id:3, nombre:"Mochila", descripcion:"Mochila resistente al agua", precio:30, imagen:"https://picsum.photos/300/200?random=3" },
  { id:4, nombre:"Auriculares", descripcion:"Auriculares con sonido envolvente", precio:60, imagen:"https://picsum.photos/300/200?random=4" },
  { id:5, nombre:"Reloj", descripcion:"Reloj digital multifunción", precio:25, imagen:"https://picsum.photos/300/200?random=5" }
];

let carrito = [];

function renderProductos() {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h2>${prod.nombre}</h2>
      <p>${prod.descripcion}</p>
      <p><b>Precio: ${prod.precio}€</b></p>
      <div class="botones">
        <button class="comprar">Comprar</button>
        <button class="carrito" onclick="agregarCarrito(${prod.id})">Añadir al carrito</button>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

function agregarCarrito(id) {
  const prod = productos.find(p => p.id === id);
  carrito.push(prod);
  renderCarrito();
}

function renderCarrito() {
  const ul = document.getElementById("items-carrito");
  ul.innerHTML = "";
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - ${item.precio}€`;
    ul.appendChild(li);
  });
}

renderProductos();
