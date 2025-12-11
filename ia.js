// ia.js - IA local simple. Exporta window.IA_ASK(prompt) -> Promise<string>
(function(){
  function searchProducts(q){
    if(typeof productos === 'undefined') return [];
    q = q.toLowerCase();
    return productos.filter(p => (p.nombre + ' ' + p.descripcion + ' ' + p.categoria).toLowerCase().includes(q)).slice(0,6);
  }

  function answer(prompt){
    const q = prompt.toLowerCase();
    if(/hola|buenas|buenas tardes|buenos/.test(q)) return "Hola 👋. Puedo ayudarte a buscar productos, ver ofertas o explicar cómo comprar.";
    if(/ofert|rebaj|descuent/.test(q)){
      const ofs = productos ? productos.filter(p=>p.oferta).slice(0,6) : [];
      if(!ofs.length) return "Ahora mismo no hay ofertas destacadas. Prueba a buscar 'ofertas'.";
      return "Ofertas actuales: " + ofs.map(x=> `${x.nombre} — ${x.precio.toFixed(2)}€`).join(' ; ');
    }
    if(/precio|cuánto cuesta|cuestan/.test(q)){
      const found = searchProducts(q);
      if(found.length) return "He encontrado: " + found.map(x=> `${x.nombre} — ${x.precio.toFixed(2)}€`).join(' ; ');
      return "No he encontrado productos por ese criterio.";
    }
    if(/cómo comprar|comprar|pago|pagar/.test(q)) return "Añade al carrito y pulsa 'Comprar todo'. El pago está simulado en la demo; integraremos PayPal cuando lo conectes.";
    const found = searchProducts(q);
    if(found.length) return "Resultado: " + found.map(x=> `${x.nombre} — ${x.precio.toFixed(2)}€`).join(' ; ');
    return "Lo siento, no lo sé. Prueba con otro término (ej: 'auriculares', 'pc gaming', 'ofertas').";
  }

  window.IA_ASK = function(prompt){
    return new Promise(resolve=>{
      setTimeout(()=> resolve(answer(prompt)), 350 + Math.random()*650);
    });
  };
})();
