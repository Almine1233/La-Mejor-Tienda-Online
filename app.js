// app.js - lógica principal: carga productos, filtros, cart, account (local), IA (ia.js)
(function(){
  /* STATE */
  const state = {
    productos: typeof productos !== 'undefined' ? productos.slice() : [],
    cart: JSON.parse(localStorage.getItem('cart_v1') || '[]'),
    user: JSON.parse(localStorage.getItem('session_user') || 'null'),
    categories: []
  };

  /* Try load admin_products.json if exists, else localStorage admin_products */
  async function loadAdminProducts(){
    try{
      const resp = await fetch('admin_products.json');
      if(resp.ok){
        const admin = await resp.json();
        if(Array.isArray(admin) && admin.length){
          // merge admin at start
          state.productos = admin.map((p,i)=>({
            id: p.id || 'adm_'+Date.now()+'_'+i,
            nombre: p.nombre || ('Admin '+i),
            categoria: p.categoria || 'Admin',
            descripcion: p.descripcion || '',
            precio: Number(p.precio) || 9.99,
            imagen: p.imagen || 'https://via.placeholder.com/640x420',
            oferta: !!p.oferta
          })).concat(state.productos);
          console.log('admin_products.json loaded');
        }
      } else {
        // fallback to localStorage admin_products
        const adminLS = JSON.parse(localStorage.getItem('admin_products')||'[]');
        if(adminLS.length){
          state.productos = adminLS.concat(state.productos);
          console.log('admin_products from localStorage loaded');
        }
      }
    }catch(e){
      // ignore
    }
  }

  /* Render categories */
  function renderCategories(){
    const cats = Array.from(new Set(state.productos.map(p=>p.categoria)));
    state.categories = cats;
    const list = document.getElementById('categories-list');
    list.innerHTML = '';
    const all = document.createElement('li'); all.textContent='Todos'; all.onclick = ()=>renderProducts(state.productos);
    list.appendChild(all);
    cats.forEach(c=>{
      const li = document.createElement('li');
      li.textContent = c;
      li.onclick = ()=>renderProducts(state.productos.filter(p=>p.categoria===c));
      list.appendChild(li);
    });
  }

  /* Render products grid */
  function renderProducts(list){
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    (list || state.productos).forEach(p=>{
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <div class="product-meta">
          <div>${p.categoria}</div>
          <div style="font-weight:800">${p.precio.toFixed(2)} €</div>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px">
          <button class="btn" onclick="app_openQuick('${p.id}')">Detalles</button>
          <button class="btn primary" onclick="app_addToCart('${p.id}')">Añadir</button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  /* Quick modal */
  const quickModal = document.getElementById('quick-modal');
  function openQuick(id){
    const p = state.productos.find(x=>x.id===id);
    if(!p) return;
    const content = document.getElementById('quick-content');
    content.innerHTML = `
      <div style="display:flex;gap:18px;flex-wrap:wrap">
        <div style="flex:1;min-width:260px"><img src="${p.imagen}" style="width:100%;border-radius:8px"></div>
        <div style="flex:1;min-width:260px">
          <h2>${p.nombre}</h2>
          <p style="color:var(--muted)">${p.descripcion}</p>
          <p style="font-weight:800">${p.precio.toFixed(2)} €</p>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn" onclick="app_addToCart('${p.id}'); app_closeQuick();">Añadir al carrito</button>
            <button class="btn primary" onclick="app_buyNow('${p.id}')">Comprar ahora</button>
          </div>
        </div>
      </div>`;
    quickModal.classList.remove('hidden');
    quickModal.setAttribute('aria-hidden','false');
  }
  function closeQuick(){ quickModal.classList.add('hidden'); quickModal.setAttribute('aria-hidden','true'); }

  /* CART */
  function saveCart(){ localStorage.setItem('cart_v1', JSON.stringify(state.cart)); updateCartUI(); }
  function addToCart(id){
    const p = state.productos.find(x=>x.id===id); if(!p) return;
    const found = state.cart.find(c=>c.id===id);
    if(found) found.cantidad = (found.cantidad||1)+1;
    else state.cart.push({ id:p.id, nombre:p.nombre, precio:p.precio, cantidad:1, imagen:p.imagen });
    saveCart();
    toast(`${p.nombre} añadido al carrito`);
  }
  function buyNow(id){
    const p = state.productos.find(x=>x.id===id); state.cart = [{ id:p.id, nombre:p.nombre, precio:p.precio, cantidad:1, imagen:p.imagen }]; saveCart(); proceedCheckout();
  }
  function updateCartUI(){
    document.getElementById('cartCount').textContent = state.cart.reduce((s,i)=>s+(i.cantidad||1),0);
    const list = document.getElementById('cart-list');
    if(!list) return;
    list.innerHTML = '';
    let total = 0;
    state.cart.forEach((it, idx)=>{
      total += it.precio * (it.cantidad||1);
      const div = document.createElement('div'); div.className='cart-item';
      div.innerHTML = `<img src="${it.imagen}"><div style="flex:1"><div style="font-weight:700">${it.nombre}</div><div style="color:var(--muted)">${(it.precio.toFixed(2))} € x ${it.cantidad}</div>
        <div style="margin-top:8px"><button onclick="app_changeQty(${idx},-1)">-</button><button onclick="app_changeQty(${idx},1)">+</button><button onclick="app_removeFromCart(${idx})">Eliminar</button></div></div>`;
      list.appendChild(div);
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
  }
  function removeFromCart(i){ state.cart.splice(i,1); saveCart(); }
  function changeQty(i,delta){ state.cart[i].cantidad = Math.max(1,(state.cart[i].cantidad||1)+delta); saveCart(); }
  function clearCart(){ if(confirm('Vaciar carrito?')){ state.cart = []; saveCart(); } }

  /* Checkout (simulado) */
  function proceedCheckout(){
    if(state.cart.length===0) return alert('Carrito vacío');
    if(!state.user){ openAccountModal(); return; }
    const name = prompt('Nombre para envío:'); if(!name) return alert('Nombre necesario');
    const address = prompt('Dirección de envío:'); if(!address) return alert('Dirección necesaria');
    const order = { id: 'ord_'+Date.now(), date: new Date().toISOString(), items: state.cart, total: state.cart.reduce((s,i)=>s+i.precio*(i.cantidad||1),0), name, address};
    // save orders per-user in localStorage
    const users = JSON.parse(localStorage.getItem('users_v1') || '[]');
    const idx = users.findIndex(u=>u.email === (state.user && state.user.email));
    if(idx>=0){ users[idx].orders = users[idx].orders || []; users[idx].orders.unshift(order); localStorage.setItem('users_v1', JSON.stringify(users)); }
    // Also store general orders
    let orders = JSON.parse(localStorage.getItem('orders_v1')||'[]'); orders.unshift(order); localStorage.setItem('orders_v1', JSON.stringify(orders));
    state.cart = []; saveCart();
    alert('Pedido confirmado. ID: ' + order.id);
  }

  /* Account (local) */
  function openAccountModal(){
    const modal = document.getElementById('account-modal'); modal.classList.remove('hidden'); modal.setAttribute('aria-hidden','false');
    const content = document.getElementById('account-content');
    content.innerHTML = '';
    const u = state.user;
    if(!u){
      content.innerHTML = `
        <h3>Iniciar sesión / Registrar</h3>
        <input id="acct-name" placeholder="Nombre" style="width:100%;padding:8px;margin:6px 0">
        <input id="acct-email" placeholder="Email" style="width:100%;padding:8px;margin:6px 0">
        <input id="acct-pass" placeholder="Contraseña" type="password" style="width:100%;padding:8px;margin:6px 0">
        <div style="display:flex;gap:8px">
          <button id="acct-register" class="btn primary">Registrar</button>
          <button id="acct-login" class="btn">Entrar</button>
        </div>
        <div style="margin-top:10px;color:var(--muted);font-size:13px">Tus datos se guardan solo en este navegador (localStorage).</div>
      `;
      document.getElementById('acct-register').onclick = ()=>{
        const name = document.getElementById('acct-name').value.trim();
        const email = document.getElementById('acct-email').value.trim();
        const pass = document.getElementById('acct-pass').value;
        if(!email||!pass||!name) return alert('Completa todos los campos');
        const users = JSON.parse(localStorage.getItem('users_v1')||'[]');
        if(users.find(x=>x.email===email)) return alert('Usuario ya existe');
        const user = { id: Date.now(), name, email, pass, orders: [], cart: [] };
        users.push(user); localStorage.setItem('users_v1', JSON.stringify(users));
        state.user = { name, email }; localStorage.setItem('session_user', JSON.stringify(state.user));
        alert('Cuenta creada');
        modal.classList.add('hidden');
      };
      document.getElementById('acct-login').onclick = ()=>{
        const email = document.getElementById('acct-email').value.trim();
        const pass = document.getElementById('acct-pass').value;
        const users = JSON.parse(localStorage.getItem('users_v1')||'[]');
        const user = users.find(u=>u.email===email && u.pass===pass);
        if(!user) return alert('Credenciales incorrectas');
        state.user = { name: user.name, email: user.email }; localStorage.setItem('session_user', JSON.stringify(state.user));
        alert('Bienvenido ' + user.name);
        modal.classList.add('hidden');
      };
    } else {
      // show profile
      content.innerHTML = `<h3>Perfil</h3><p><strong>${u.name}</strong><br>${u.email}</p><button id="acct-logout" class="btn">Cerrar sesión</button><h4>Pedidos</h4><div id="user-orders"></div>`;
      document.getElementById('acct-logout').onclick = ()=>{
        state.user = null; localStorage.removeItem('session_user'); alert('Sesión cerrada'); modal.classList.add('hidden');
      };
      const users = JSON.parse(localStorage.getItem('users_v1')||'[]');
      const userRec = users.find(x=>x.email===u.email);
      const ordersEl = document.getElementById('user-orders');
      (userRec && userRec.orders || []).forEach(o=>{
        const d = document.createElement('div');
        d.style.padding='8px'; d.style.borderBottom='1px solid rgba(255,255,255,0.03)';
        d.innerHTML = `<b>${o.id}</b> — ${new Date(o.date).toLocaleString()} — ${o.total.toFixed(2)} €`;
        ordersEl.appendChild(d);
      });
    }
  }

  /* Toast */
  function toast(msg){
    const t = document.createElement('div'); t.textContent = msg;
    t.style.position='fixed'; t.style.left='50%'; t.style.transform='translateX(-50%)'; t.style.bottom='24px';
    t.style.background='rgba(0,0,0,0.8)'; t.style.color='white'; t.style.padding='8px 12px'; t.style.borderRadius='8px'; t.style.zIndex=9999;
    document.body.appendChild(t); setTimeout(()=>t.remove(),2000);
  }

  /* IA - uses IA_ASK from ia.js */
  function initIA(){
    const iaBtn = document.getElementById('ia-mode-btn');
    const iaPanel = document.getElementById('ia-panel');
    const iaClose = document.getElementById('ia-close');
    const iaSend = document.getElementById('ia-send');
    const iaInput = document.getElementById('ia-input');
    const iaMessages = document.getElementById('ia-messages');

    iaBtn.onclick = ()=>{ iaPanel.classList.remove('hidden'); iaPanel.setAttribute('aria-hidden','false'); iaMessages.innerHTML = ''; appendIABot('Hola — soy el asistente de la tienda.') };
    iaClose.onclick = ()=>{ iaPanel.classList.add('hidden'); iaPanel.setAttribute('aria-hidden','true'); };
    iaSend.onclick = async ()=>{
      const q = iaInput.value.trim(); if(!q) return;
      appendUser(q); iaInput.value='';
      const r = await window.IA_ASK(q); appendIABot(r);
    };

    function appendUser(t){ const div = document.createElement('div'); div.className='ia-bubble user'; div.textContent = t; iaMessages.appendChild(div); iaMessages.scrollTop = iaMessages.scrollHeight; }
    function appendIABot(t){ const div = document.createElement('div'); div.className='ia-bubble bot'; div.textContent = t; iaMessages.appendChild(div); iaMessages.scrollTop = iaMessages.scrollHeight; }
    window.appendIABot = appendIABot;
  }

  /* decorations (decoraciones.js handles heavy lifting) */

  /* UI wiring */
  function wireUI(){
    document.getElementById('menu-btn').onclick = ()=>{ document.getElementById('side-menu').classList.toggle('open'); };
    document.getElementById('side-close').onclick = ()=>{ document.getElementById('side-menu').classList.remove('open'); };
    document.getElementById('searchBar').addEventListener('input', (e)=> {
      const q = e.target.value.toLowerCase().trim();
      if(!q) renderProducts(state.productos.slice(0,60));
      else renderProducts(state.productos.filter(p=> (p.nombre+' '+p.descripcion+' '+p.categoria).toLowerCase().includes(q)));
    });
    document.getElementById('cart-btn').onclick = ()=>{ const panel = document.getElementById('cart-panel'); panel.classList.toggle('hidden'); };
    document.getElementById('clear-cart').onclick = ()=> clearCart();
    document.getElementById('checkout-btn').onclick = ()=> proceedCheckout();
    document.getElementById('account-btn').onclick = ()=> openAccountModal();
    document.getElementById('quick-close').onclick = ()=> closeQuick();
    document.getElementById('offers-btn').onclick = ()=> { renderOffers(); window.scrollTo({top:0,behavior:'smooth'}); };
  }

  /* render offers */
  function renderOffers(){
    const offers = state.productos.filter(p=>p.oferta);
    const sec = document.getElementById('offers-section'); const list = document.getElementById('offers-list');
    if(!offers.length){ sec.classList.add('hidden'); return; }
    sec.classList.remove('hidden'); list.innerHTML='';
    offers.slice(0,12).forEach(p=>{
      const card = document.createElement('div'); card.className='product-card';
      card.innerHTML = `<img src="${p.imagen}"><h3>${p.nombre}</h3><div style="font-weight:800">${p.precio.toFixed(2)} €</div>
        <div style="margin-top:10px"><button class="btn" onclick="app_openQuick('${p.id}')">Detalles</button> <button class="btn primary" onclick="app_addToCart('${p.id}')">Añadir</button></div>`;
      list.appendChild(card);
    });
  }

  /* init */
  window.app_openQuick = openQuick;
  window.app_closeQuick = closeQuick;
  window.app_addToCart = addToCart;
  window.app_buyNow = buyNow;
  window.app_changeQty = changeQty;
  window.app_removeFromCart = removeFromCart;

  async function init(){
    await loadAdminProducts();
    renderCategories();
    renderProducts(state.productos.slice(0,60)); // show 60 products initial
    updateCartUI();
    wireUI();
    initIA();
    renderOffers();
  }

  init();

})();
