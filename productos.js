let productos = JSON.parse(localStorage.getItem("productos")) || [
  {
    id: 1,
    nombre: "AirPods Pro",
    precio: 249,
    categoria: "Audio",
    imagen: "images/airpods.jpg",
    descripcion: "Auriculares inalámbricos con cancelación de ruido."
  },
  {
    id: 2,
    nombre: "PC Gaming",
    precio: 1299,
    categoria: "Tecnología",
    imagen: "images/pc-gaming.jpg",
    descripcion: "PC de alto rendimiento para gaming."
  },
  {
    id: 3,
    nombre: "Altavoz Bluetooth",
    precio: 79,
    categoria: "Audio",
    imagen: "images/altavoz.jpg",
    descripcion: "Sonido potente y batería de larga duración."
  }
];

function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

guardarProductos();
