// ia.js - IA local simple para responder preguntas sobre productos y tienda
// exporta window.IA_ASK(prompt) -> Promise<string>

(function(){
  function simpleProductSearch(q){
    q = q.toLowerCase();
    if(typeof productos === 'undefined') return [];
    return productos.filter(p => (p.nombre + ' ' + p.descripcion + ' ' + p.categoria).toLowerCase().includes(q)).slice(0,5);
  }

  function answerPrompt(q){
    q = q.toLowerCase();
    // greetings
    if(/hola|buenos|buenas|hey/.test(q)) return "¡Hola! 👋 Puedo ayudarte a encontrar productos, ofertas o explicar cómo comprar. Pregúntame por ejemplo '¿tienes auriculares?'";
    if(/oferta|rebaja|descuento/.test(q)){
      const ofs = productos ? productos.filter(p=>p.oferta).slice(0,5) : [];
      if(!ofs.length) return "Ahora mismo no hay ofertas destacadas, prueba a buscar 'ofertas' más tarde.";
      return "Estas son algunas ofertas destacadas: " + ofs.map(p=> `${p.nombre} (${p.precio.toFixed(2)}€)` ).join(' — ');
    }
    if(/precio|cuánto cuesta|cuestan|cost/i.test(q)){
      const found = simpleProductSearch(q);
      if(found.length) return `He encontrado: ${found.map(p=> `${p.nombre} — ${p.precio.toFixed(2)}€`).join(' ; ')}`;
      return "No encontré productos relacionados — prueba con palabras más cortas (ej: 'auriculares', 'pc gaming').";
    }
    if(/cómo comprar|comprar|pago|pagar/.test(q)){
      return "Para comprar: añade productos al carrito y pulsa 'Comprar todo'. Actualmente el pago se simula. Cuando tengas PayPal configurado lo integrarás en la página de compra.";
    }
    if(/envío|entrega|llegar/.test(q)) return "Los detalles de envío se piden en el formulario de compra (dirección y teléfono). En la versión demo no hay envío real.";
    // product search fallback
    const found = simpleProductSearch(q);
    if(found.length) return `Encontrado: ${found.slice(0,5).map(p=> `${p.nombre} — ${p.precio.toFixed(2)}€`).join(' — ')}`;
    // fallback general
    const fallbacks = [
      "Lo siento, no lo sé exactamente. Prueba con 'buscar auriculares' o '¿qué ofertas hay?'",
      "Puedo buscar productos por nombre o categoría. Escribe algo como 'buscar auriculares' o 'ofertas'."
    ];
    return fallbacks[Math.floor(Math.random()*fallbacks.length)];
  }

  window.IA_ASK = function(prompt){
    return new Promise(resolve=>{
      setTimeout(()=> resolve(answerPrompt(prompt)), 600 + Math.random()*600);
    });
  };
})();
