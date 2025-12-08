// app.js - controla UI y ahora lee admin_products desde localStorage
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
function el(tag, attrs={}, html=''){ const e = document.createElement(tag); for(const k in attrs) e.setAttribute(k, attrs[k]); e.innerHTML = html; return e; }

// STATE
let state = {
  productos: typeof productos !== 'undefined' ? productos.slice() : [],
  filtered: [],
  selectedCategory: 'Todos',
  user: JSON.parse(localStorage.getItem('session_user')) || null,
  cart: []
};

// --- ADMIN PRODUCTS MERGE ---
// If there are admin products in localStorage, merge them (admin_products is expected to be an array)
function loadAdminProducts() {
  try {
    const admin = JSON.parse(localStorage.getItem('admin_products') || '[]');
    if(!Array.isArray(admin) || admin.length===0) return;
    // normalize admin products: ensure fields id,nombre,precio,categoria,imagen,descripcion
    const mapped = admin.map((p, i) => {
      return {
        id: p.id || ('a'+Date.now()+i),
        nombre: p.nombre || ('Producto admin '+(i+1)),
        precio: Number(p.precio) || 9.99,
        categoria: p.categoria || 'Admin',
        descripcion: p.descripcion || '',
        imagen: p.imagen || 'https://source.unsplash.com/640x420/?product'
      };
    });
    // Avoid id collisions: remove base products that have same id as admin
    const existingIds = new Set(mapped.map(p=>String(p.id)));
    state.productos = mapped.concat(state.productos.filter(p=>!existingIds.has(String(p.id))));
    console.log('admin_products cargados:', mapped.length);
  } catch(e) {
    console.warn('No se pudieron cargar admin_products', e);
  }
}

// USER / AUTH (localStorage)
function saveUsers(users){ localStorage.setItem('users_v1', JSON.stringify(users)); }
function loadUsers(){ return JSON.parse(localStorage.getItem('users_v1')||'[]'); }

function registerUser({email,name,password}){
  const users = loadUsers();
  if(users.find(u=>u.email===email)) throw new Error('Usuario ya existe');
  const user = {id:Date.now(), email, name, password, orders: [], cart: []};
  users.push(user); saveUsers(users);
  setSession(user);
  return user;
}
function loginUser({email,password}){
  const users = loadUsers();
  const u = users.find(x=>x.email===email && x.password===password);
  if(!u) throw new Error('Credenciales incorrectas');
  setSession(u); return u;
}
function setSession(user){
  state.user = user;
  localStorage.setItem('session_user', JSON.stringify(user));
  state.cart = user.cart || [];
  updateCartUI();
  renderHeaderUser();
}
function logout(){
  state.user = null;
  localStorage.removeItem('session_user');
  state.cart = [];
  updateCartUI();
  renderHeaderUser();
}

function persistUserChanges(){
  if(!state.user) {
    // guest: persist guest cart
    localStorage.setItem('guest_cart', JSON.stringify(state.cart));
    return;
  }
  const users = loadUsers();
  const idx = users.findIndex(u=>u.id===state.user.id);
  if(idx>=0){
    users[idx].cart = state.cart;
    users[idx].orders = users[idx].orders || state.user.orders || [];
    saveUsers(users);
    // refresh session copy
    localStorage.setItem('session_user', JSON.stringify(users[idx]));
    state.user = users[idx];
  }
}

// CART
function addToCart(productId){
  const p = state.productos.find(x=>x.id==productId);
  if(!p) return alert('Producto no encontrado');
  const found = state.cart.find(i=>i.id==productId);
  if(found) found.cantidad = (found.cantidad||1)+1;
  else state.cart.push({...p, cantidad:1});
  updateCartUI();
  persistUserChanges();
  alert(`${p.nombre} añadido al carrito`);
}
function cartIncrease(i){ state.cart[i].cantidad++; updateCartUI(); persistUserChanges(); }
function cartDecrease(i){ state.cart[i].cantidad = Math.max(1, state.cart[i].cantidad-1); updateCartUI(); persistUserChanges(); }
function cartRemove(i){ state.cart.splice(i,1); updateCartUI(); persistUserChanges(); }
function clearCart(){ if(confirm('Vaciar carrito?')){ state.cart=[]; updateCartUI(); persistUserChanges(); } }

function updateCartUI(){
  $('#cart-count').textContent = state.cart.reduce((s,i)=>s+(i.cantidad||1),0) || 0;
  const elCartItems = $('#cart-items');
  if(!elCartItems) return;
  elCartItems.innerHTML = '';
  let total=0;
  state.cart.forEach((it, idx)=>{
    total += it.precio * (it.cantidad||1);
    const li = el('li',{},`<div>${it.nombre} <small>(${it.categoria})</small></div>
      <div>${it.precio.toFixed(2)}€ x ${it.cantidad} 
      <div style="margin-top:6px"><button onclick="cartIncrease(${idx})">+</button>
      <button onclick="cartDecrease(${idx})">-</button>
      <button onclick="cartRemove(${idx})">Eliminar</button></div></div>`);
    elCartItems.appendChild(li);
  });
  $('#cart-total').textContent = total.toFixed(2);
}

// CATEGORIES & SEARCH
function renderCategories(){
  const panel = $('#categories-panel'); panel.innerHTML='';
  const allBtn = el('div',{},`<button class="btn small">Todos</button>`);
  allBtn.firstChild.onclick = ()=>{ state.selectedCategory='Todos'; applyFilters(); panel.classList.add('hidden'); };
  panel.appendChild(allBtn);
  const cats = Array.from(new Set(state.productos.map(p=>p.categoria))).slice(0,30);
  cats.forEach(c=>{
    const b = el('div',{},`<button class="btn small">${c}</button>`);
    b.firstChild.onclick = ()=>{ state.selectedCategory=c; applyFilters(); panel.classList.add('hidden'); };
    panel.appendChild(b);
  });
}

// FILTER + RENDER
function applyFilters(query){
  const q = (query || $('#search-input').value||'').toLowerCase().trim();
  let list = state.productos.slice();
  if(state.selectedCategory && state.selectedCategory!=='Todos') list = list.filter(p=>p.categoria===state.selectedCategory);
  if(q) list = list.filter(p=> (p.nombre+' '+p.descripcion+' '+p.categoria).toLowerCase().includes(q));
  state.filtered = list;
  renderProducts(list);
}

function renderProducts(list){
  const container = $('#productos'); container.innerHTML='';
  (list || state.productos).forEach(p=>{
    const card = el('div', {class:'card'});
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" onclick="openQuick('${p.id}')">
      <h3>${p.nombre}</h3>
      <p class="desc">${p.descripcion}</p>
      <div class="price">${p.precio.toFixed(2)} €</div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="btn" onclick="openQuick('${p.id}')">Detalles</button>
        <button class="btn primary" onclick="addToCart('${p.id}')">Añadir</button>
      </div>`;
    container.appendChild(card);
  });
}

// QUICKVIEW
function openQuick(id){
  const p = state.productos.find(x=>String(x.id)===String(id));
  if(!p) return;
  $('#quick-content').innerHTML = `
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div style="flex:1;min-width:260px"><img src="${p.imagen}" style="width:100%;border-radius:8px"></div>
      <div style="flex:1;min-width:260px">
        <h2>${p.nombre}</h2>
        <p style="color:#6b7780">${p.descripcion}</p>
        <p style="font-weight:800">${p.precio.toFixed(2)} €</p>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn" onclick="addToCart('${id}'); closeQuick()">Añadir al carrito</button>
          <button class="btn primary" onclick="buyNow('${id}')">Comprar ahora</button>
        </div>
      </div>
    </div>`;
  $('#quickview').classList.remove('hidden');
}
function closeQuick(){ $('#quickview').classList.add('hidden'); }

// OFFERS
function renderOffers(){
  const offers = state.productos.filter(p=>p.oferta===true).slice(0,12);
  const list = $('#offers-list'); list.innerHTML='';
  offers.forEach(p=>{
    const c = el('div',{class:'card'});
    c.innerHTML = `<img src="${p.imagen}"><h3>${p.nombre}</h3><div class="price">${p.precio.toFixed(2)} €</div>
      <div><button class="btn" onclick="openQuick('${p.id}')">Detalles</button></div>`;
    list.appendChild(c);
  });
  if(offers.length) $('#offers-section').classList.remove('hidden'); else $('#offers-section').classList.add('hidden');
}

// CHECKOUT (simulado)
function buyNow(id){
  const p = state.productos.find(x=>String(x.id)===String(id));
  state.cart = [{...p, cantidad:1}];
  persistUserChanges();
  finalizeOrder();
}

function finalizeOrder(){
  if(!state.user){
    if(!confirm('Necesitas una cuenta para finalizar el pedido. ¿Quieres crear una ahora?')) return;
    openAccount('login'); return;
  }
  if(!state.cart.length) return alert('Carrito vacío');
  const users = loadUsers();
  const idx = users.findIndex(u=>u.id===state.user.id);
  if(idx>=0){
    const order = { id: Date.now(), date: new Date().toISOString(), items: state.cart, total: state.cart.reduce((s,i)=>s+(i.precio*(i.cantidad||1)),0) };
    users[idx].orders = users[idx].orders || [];
    users[idx].orders.push(order);
    users[idx].cart = []; // clear server cart
    saveUsers(users);
    // update session and state
    state.user = users[idx];
    localStorage.setItem('session_user', JSON.stringify(state.user));
    state.cart = [];
    updateCartUI();
    alert('Pedido confirmado (simulado). Gracias!');
  }
}

// ACCOUNT UI
function renderHeaderUser(){
  const btn = $('#account-btn');
  btn.textContent = state.user ? `${state.user.name || state.user.email} ▾` : 'Mi cuenta';
}

function openAccount(tab='login'){
  $('#account-content').innerHTML = '';
  const content = $('#account-content');
  if(!tab || tab==='login'){
    content.innerHTML = `
      <div class="account-section">
        <div class="account-box">
          <h3>Iniciar sesión</h3>
          <input id="login-email" placeholder="Email"><br>
          <input id="login-pass" placeholder="Contraseña" type="password"><br>
          <button id="do-login" class="btn primary">Entrar</button>
        </div>
        <div class="account-box">
          <h3>Crear cuenta</h3>
          <input id="reg-name" placeholder="Nombre"><br>
          <input id="reg-email" placeholder="Email"><br>
          <input id="reg-pass" placeholder="Contraseña" type="password"><br>
          <button id="do-register" class="btn">Registrar</button>
        </div>
      </div>
      <hr>
      <div><strong>¿Ya tienes cuenta?</strong> Admin local — tus datos se guardan en este navegador.</div>
    `;
    $('#do-login').onclick = ()=>{
      try{
        const email = $('#login-email').value.trim();
        const pass = $('#login-pass').value;
        const u = loginUser({email, password:pass});
        alert('Bienvenido ' + (u.name || u.email));
        $('#account-modal').classList.add('hidden');
        renderHeaderUser();
      }catch(err){ alert(err.message); }
    };
    $('#do-register').onclick = ()=>{
      try{
        const name = $('#reg-name').value.trim();
        const email = $('#reg-email').value.trim();
        const pass = $('#reg-pass').value;
        const u = registerUser({email, name, password:pass});
        alert('Cuenta creada. Bienvenido ' + u.name);
        $('#account-modal').classList.add('hidden');
        renderHeaderUser();
      }catch(err){ alert(err.message); }
    };
  }
  if(tab==='profile'){
    if(!state.user) return openAccount('login');
    const u = state.user;
    content.innerHTML = `<h3>Perfil</h3><p><b>${u.name}</b> — ${u.email}</p>
      <h4>Historial de pedidos</h4><div id="orders-list"></div>
      <button id="logout-btn" class="btn">Cerrar sesión</button>`;
    $('#logout-btn').onclick = ()=>{ logout(); $('#account-modal').classList.add('hidden'); };
    const ul = $('#orders-list');
    (u.orders||[]).forEach(o=>{
      const d = el('div',{},`<b>Pedido ${o.id}</b> — ${new Date(o.date).toLocaleString()} — Total: ${o.total.toFixed(2)} €`);
      ul.appendChild(d);
    });
  }
  $('#account-modal').classList.remove('hidden');
}

// IA chat UI wiring (uses IA_ASK from ia.js)
function initIA(){
  $('#ia-messages').innerHTML = '';
  appendIABot("Hola — soy el asistente de la tienda. Pregúntame por productos, ofertas o cómo comprar.");
}
function appendIABot(text){ const m = el('div',{'class':'ia-bubble bot'},text); $('#ia-messages').appendChild(m); $('#ia-messages').scrollTop = $('#ia-messages').scrollHeight; }
function appendIAUser(text){ const m = el('div',{'class':'ia-bubble user'},text); $('#ia-messages').appendChild(m); $('#ia-messages').scrollTop = $('#ia-messages').scrollHeight; }

async function iaAsk(text){
  appendIAUser(text);
  const resp = await window.IA_ASK(text);
  appendIABot(resp);
}

// EVENTS
function wireEvents(){
  $('#categories-toggle').onclick = ()=> $('#categories-panel').classList.toggle('hidden');
  $('#search-btn').onclick = ()=> applyFilters();
  $('#search-input').addEventListener('keydown', e=>{ if(e.key==='Enter') applyFilters(); });

  $('#cart-float').onclick = ()=> $('#cart-panel').classList.toggle('hidden');
  $('#quick-close').onclick = closeQuick;
  $('#clear-cart').onclick = clearCart;
  $('#checkout').onclick = finalizeOrder;

  $('#account-btn').onclick = ()=> openAccount('login');
  $('#account-close').onclick = ()=> $('#account-modal').classList.add('hidden');

  $('#ai-mode-btn').onclick = ()=> { $('#ia-panel').classList.remove('hidden'); initIA(); };
  $('#ia-close').onclick = ()=> $('#ia-panel').classList.add('hidden');
  $('#ia-send').onclick = ()=> { const q = $('#ia-input').value.trim(); if(!q) return; iaAsk(q); $('#ia-input').value=''; };

  $('#offers-btn').onclick = ()=> { renderOffers(); window.scrollTo({top:0,behavior:'smooth'}); };
}

// INIT
function init(){
  // merge admin products if present
  loadAdminProducts();

  state.productos = state.productos || [];
  // mark some products as offers for demo
  state.productos.slice(0,8).forEach((p,i)=> p.oferta = p.oferta || false);
  renderCategories();
  applyFilters();
  renderOffers();
  wireEvents();
  // restore user/cart session
  if(state.user){
    state.cart = state.user.cart || [];
    updateCartUI();
  } else {
    state.cart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
    updateCartUI();
  }
  renderHeaderUser();

  // expose some helpers for inline buttons
  window.addToCart = addToCart;
  window.openQuick = openQuick;
  window.buyNow = buyNow;
  window.cartIncrease = cartIncrease;
  window.cartDecrease = cartDecrease;
  window.cartRemove = cartRemove;
}
init();
