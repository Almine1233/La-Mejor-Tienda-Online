// productos.js — genera 50 productos por categoría (8 categorías)
const CATEGORIES = [
  { key: 'Gaming', keywords: ['gaming pc','video games','gaming setup'] },
  { key: 'Audio', keywords: ['headphones','earbuds','speakers'] },
  { key: 'Accesorios', keywords: ['keyboard','mouse','usb'] },
  { key: 'Dispositivos', keywords: ['tablet','smartphone','laptop'] },
  { key: 'Hogar', keywords: ['smart home','lamp','robot vacuum'] },
  { key: 'Cocina', keywords: ['coffee maker','cookware','blender'] },
  { key: 'Deporte', keywords: ['sports','fitness','camera action'] },
  { key: 'Moda', keywords: ['backpack','watch','sneakers'] }
];

const productos = [];
let idCounter = 1;

CATEGORIES.forEach(cat => {
  for (let i = 1; i <= 50; i++) {
    const kw = cat.keywords[(i-1) % cat.keywords.length];
    const name = `${cat.key} ${i} ${kw.split(' ')[0]}`;
    const basePrice = {
      'Gaming': 600, 'Audio': 80, 'Accesorios': 25, 'Dispositivos': 200,
      'Hogar': 120, 'Cocina': 60, 'Deporte': 50, 'Moda': 45
    }[cat.key] || 50;
    const price = Math.round((basePrice + Math.random()*basePrice));
    const img = `https://source.unsplash.com/640x420/?${encodeURIComponent(kw)}`;
    productos.push({
      id: idCounter++,
      nombre: name,
      precio: price,
      categoria: cat.key,
      descripcion: `Producto ${i} de la categoría ${cat.key}. Perfecto para ${kw}.`,
      imagen: img
    });
  }
});
