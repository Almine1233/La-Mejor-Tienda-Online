let productos = [
  {
    id: 1,
    nombre: "Auriculares Gamer",
    descripcion: "Auriculares con sonido envolvente y micro integrado",
    precio: 45,
    imagen: "https://images.unsplash.com/photo-1593134731660-6db0e271d17e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    nombre: "Camiseta Estilosa",
    descripcion: "Camiseta cómoda y moderna para el día a día",
    precio: 20,
    imagen: "https://images.unsplash.com/photo-1602810318724-bd2e8e50393e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    nombre: "Mochila Urbana",
    descripcion: "Mochila resistente para colegio o viajes",
    precio: 35,
    imagen: "https://images.unsplash.com/photo-1593032465172-f88f4eae7390?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    nombre: "Gafas de Sol",
    descripcion: "Gafas de sol modernas con protección UV",
    precio: 25,
    imagen: "https://images.unsplash.com/photo-1524230576980-5d180019ba1d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    nombre: "Reloj Deportivo",
    descripcion: "Reloj inteligente con seguimiento de actividad",
    precio: 60,
    imagen: "https://images.unsplash.com/photo-1519112230140-41ee79c1492b?auto=format&fit=crop&w=400&q=80"
  }
];

function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductos() {
  let datos = localStorage.getItem("productos");
  if (datos) productos = JSON.parse(datos);
}
cargarProductos();
