// productos.js - genera productos dinámicamente (50 por categoría, imágenes placeholder)
const CATEGORIES = [
  'Tecnología','Audio','Accesorios','Dispositivos','Hogar','Cocina','Deporte','Moda'
];

const productos = [];
let _pid = 1;

CATEGORIES.forEach(cat=>{
  for(let i=1;i<=50;i++){
    const id = 'p' + (_pid++);
    const nombre = `${cat} ${i}`;
    const base = { 'Tecnología':250, 'Audio':80, 'Accesorios':22, 'Dispositivos':180, 'Hogar':90, 'Cocina':60, 'Deporte':40, 'Moda':35 }[cat] || 50;
    const precio = Math.round((base + Math.random()*base)*100)/100;
    // imágenes temáticas vía source.unsplash
    const query = encodeURIComponent(cat + ' product');
    const imagen = `https://source.unsplash.com/640x480/?${query}&sig=${i}`;
    const oferta = (i % 13 === 0); // algunos en oferta
    productos.push({
      id,
      nombre,
      categoria: cat,
      descripcion: `Excelente ${nombre} para ${cat.toLowerCase()}.`,
      precio,
      imagen,
      oferta
    });
  }
});
