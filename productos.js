// productos.js
let productos = [
  {
    id: 1,
    nombre: "Producto 1",
    descripcion: "Descripción corta del producto 1",
    precio: 10,
    imagen: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion: "Descripción corta del producto 2",
    precio: 20,
    imagen: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    nombre: "Producto 3",
    descripcion: "Descripción corta del producto 3",
    precio: 15,
    imagen: "https://via.placeholder.com/200"
  }
];

// Guardar y cargar productos en LocalStorage para admin
function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductos() {
  let datos = localStorage.getItem("productos");
  if (datos) productos = JSON.parse(datos);
}
cargarProductos();
