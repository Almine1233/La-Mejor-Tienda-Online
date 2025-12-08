// ia.js - IA local simple para responder preguntas sobre productos y tienda
(function(){
  function simpleProductSearch(q){
    q = q.toLowerCase();
    if(typeof productos === 'undefined') return [];
    return productos.filter(p => (p.nombre + ' ' + p.descripcion + ' ' + p.categoria).toLowerCase().includes(q)).slice(0,5);
  }

  function answerPrompt(q){
    q = q.toLowerCase();
    if(/hola|buenos|buenas|hey/.test(q)) return "¡Hola! 👋 Puedo ayudarte a encontrar productos, ofertas o explicar cómo comprar. Prueba: 'buscar auriculares' o 'ofertas'.";
    if(/oferta|rebaja|descuento/.test(q)){
      const ofs = productos ? productos.filter(p=>p.oferta).slice(0,5) : [];
      if(!ofs.length) return "Ahora mismo no hay ofertas destacadas, prueba a buscar otra cosa.";
      return "Ofertas: " + ofs.map(p=> `${p.nombre} (${p.precio.toFixed(2)}€)` ).join(' — ');
    }
    if(/precio|cuánto cuesta|cuestan|cost/i.test(q)){
      const found = simpleProductSearch(q);
      if(found.length) return `Encontrado: ${found.map(p=> `${p.nombre} — ${p.precio.toFixed(2)}€`).join(' ; ')}`;
      return "No encontré productos relacionados — prueba con palabras más cortas.";
    }
    if(/cómo comprar|comprar|pago|pagar/.test(q)){
      return "Añade al carrito y pulsa 'Comprar todo'. En esta demo el pago es simulado; más adelante integraremos PayPal.";
    }
    if(/envío|entrega|llegar/.test(q)) return "Los datos de envío se piden en el formulario de compra (dirección y teléfono). En la demo no hay envío real.";
    const found = simpleProductSearch(q);
    if(found.length) return `He encontrado: ${found.slice(0,5).map(p=> `${p.nombre} — ${p.precio.toFixed(2)}€`).join(' — ')}`;
    const fallbacks = [
      "No lo sé exactamente. Prueba con 'buscar auriculares' o '¿qué ofertas hay?'",
      "Puedo buscar productos por nombre o categoría. Escribe por ejemplo 'smartwatch' o 'ofertas'."
    ];
    return fallbacks[Math.floor(Math.random()*fallbacks.length)];
  }

  window.IA_ASK = function(prompt){
    return new Promise(resolve=>{
      setTimeout(()=> resolve(answerPrompt(prompt)), 300 + Math.random()*700);
    });
  };
})();
