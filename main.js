// main.js - debe cargarse after productos.js
const grid = document.getElementById('productos');
const categoriesEl = document.getElementById('categories');
const qInput = document.getElementById('q');
const sortSelect = document.getElementById('sort');
const cartBtn = document.getElementById('cart-btn');
const cartPanel = document.getElementById('cart-panel');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const quickview = document.getElementById('quickview');
const quickBody = document.getElementById('quick-body');
const checkoutBtn = document.getElementById('checkout-btn');
const pagerEl = document.getElementById('pager');

let state = {
  productos,
  filtered: productos.slice(),
  category: 'todos',
  query: '',
  page: 1,
  perPage: 24
};

let cart = JSON.parse(localStorage.getItem('cart_v1')) || [];

// helpers
function formatPrice(n){ return n.toFixed(2); }
function saveCart(){ localStorage.setItem('cart_v1', JSON.stringify(cart)); updateCartUI(); }
function updateCartUI(){
  cartItemsEl.innerHTML = '';
  let total = 0, count = 0;
  cart.forEach((it, idx)=>{
    total += it.precio * (it.cantidad || 1);
    count += it.cantidad || 1;
    const li = document.createElement('li');
    li.innerHTML = `<div>${it.nombre} <small>(${it.categoria})</small></div>
                    <div style="text-align:right">
                      ${formatPrice(it.precio)}€ x ${it.cantidad || 1}
                      <div style="margin-top:6px"><button onclick="cartIncrease(${idx})">+</button>
                      <button onclick="cartDecrease(${idx})">-</button>
                      <button onclick="cartRemove(${idx})">Eliminar</button></div>
                    </div>`;
    cartItemsEl.appendChild(li);
  });
  cartTotalEl.textContent = formatPrice(total);
  cartCountEl.textContent = count;
}

window.cartIncrease = function(i){ cart[i].cantidad = (cart[i].cantidad || 1) + 1; saveCart(); }
window.cartDecrease = function(i){ cart[i].cantidad = Math.max(1, (cart[i].cantidad || 1) - 1); saveCart(); }
window.cartRemove = function(i){ cart.splice(i,1); saveCart(); }
function clearCart(){ if(confirm('Vaciar carrito?')){ cart = []; saveCart(); } }

// render categories
function renderCategories(){
  categoriesEl.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.textContent = 'Todos'; allBtn.className = state.category==='todos'?'active':''; allBtn.onclick=()=>{ state.category='todos'; applyFilters(); };
  categoriesEl.appendChild(allBtn);
  CATEGORIES.forEach(c=>{
    const b = document.createElement('button');
    b.textContent = c.key;
    b.className = state.category===c.key?'active':'';
    b.onclick = ()=>{ state.category=c.key; applyFilters(); };
    categoriesEl.appendChild(b);
  });
}

// apply filters, search, sort
function applyFilters(){
  let list = productos.slice();
  if(state.category !== 'todos') list = list.filter(p=>p.categoria===state.category);
  if(state.query) list = list.filter(p=> (p.nombre+' '+p.descripcion+' '+p.categoria).toLowerCase().includes(state.query.toLowerCase()));
  if(sortSelect.value === 'price-asc') list.sort((a,b)=>a.precio-b.precio);
  if(sortSelect.value === 'price-desc') list.sort((a,b)=>b.precio-a.precio);
  state.filtered = list;
  state.page = 1;
  renderProductsPage();
}

// render page
function renderProductsPage(){
  grid.innerHTML = '';
  const start = (state.page-1)*state.perPage;
  const pageItems = state.filtered.slice(start, start+state.perPage);
  pageItems.forEach(p=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      <h3>${p.nombre}</h3>
      <p class="desc">${p.descripcion}</p>
      <div class="precio">${formatPrice(p.precio)} €</div>
      <div class="actions">
        <button class="btn btn-comprar" onclick="openQuick(${p.id})">Detalles</button>
        <button class="btn btn-carrito" onclick="addToCart(${p.id})">
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhAQEg8QEhASEBAPEBUQEBAXEBIQFRYWFxURFxYYHiggGholGxUVITEhJSkrLi8uFx8zODMsNygvLisBCgoKDg0NFQ8NDi0ZFRkrLTIrKysrKy0tLSsrLSsrKzctKzcrKy0rNysrKzctNys3KysrNy0rKystKy0rNy4rK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EAEAQAAIBAgMEBgYHBgcBAAAAAAABAgMRBBIhBTFBUQYiYXGBkRMyQqGx0RRScoLB4fAVI0NikqIzRFNjw9PxB//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADxs9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFN0r2/DBYedebSaTyJ8Xz7l8uYHu19uKnOGHpRVTEz3Rv1YR3uc2tyS1/9R46U3rKtUb/AJXlj4Jfjc57oLsyplnjsSn9KxXWSl61HDtpxp9kpWUpduVeyjq7AcH072PiaiVWFatUUFrTzO8VxnFLf2rf3mH/AM325VjWjhalWVWlWjN0lJ3dOpBZrJ/VcVLTmla2t+8nAp9nbFpUsasRltKpCpCNksvpHaTduEssamva/GDqgAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGFaqoRc5NKMU229ySPmsMPLbGNVeaf7Nwk/3a9nE14vRdsIvV8G9NdS76QOePqPB05ShhYNPFVYO0p/7MHzfPgnfflOgwWEhShClThGFOEVCEYq0YxW5JAbrCx6eMDFkPEK9bCxW9VZVJdlONOacv6pwX3iTUqW7+CW9m3A4Rxcqk/8AEkkuy" style="height:34px;object-fit:contain;" alt="Comprar">
        </button>
      </div>`;
    grid.appendChild(card);
  });
  renderPager();
}

// pager
function renderPager(){
  pagerEl.innerHTML = '';
  const totalPages = Math.ceil(state.filtered.length / state.perPage);
  const info = document.createElement('div'); info.textContent = `Mostrando ${state.filtered.length} productos (${state.page}/${totalPages})`;
  pagerEl.appendChild(info);
  const pages = document.createElement('div'); pages.style.marginLeft='12px';
  const max = Math.min(totalPages, 10);
  for(let i=1;i<=max;i++){
    const b = document.createElement('button'); b.textContent=i; if(i===state.page) b.style.fontWeight='800';
    b.onclick=()=>{ state.page=i; renderProductsPage(); };
    pages.appendChild(b);
  }
  pagerEl.appendChild(pages);
}

// quickview
window.openQuick = function(id){
  const p = productos.find(x=>x.id===id);
  if(!p) return;
  quickBody.innerHTML = `<div style="display:flex;gap:18px;flex-wrap:wrap">
    <div style="flex:1;min-width:260px"><img src="${p.imagen}" alt="${p.nombre}" style="width:100%;border-radius:10px"></div>
    <div style="flex:1;min-width:260px">
      <h2>${p.nombre}</h2>
      <p style="color:#6b7780">${p.descripcion}</p>
      <p style="font-weight:800">${formatPrice(p.precio)} €</p>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-carrito" onclick="addToCart(${id}); closeQuickView();">Añadir al carrito</button>
        <button class="btn primary" onclick="buyNow(${id})">Comprar ahora</button>
      </div>
    </div></div>`;
  quickview.style.display='flex'; quickview.setAttribute('aria-hidden','false');
}
function closeQuickView(){ quickview.style.display='none'; quickview.setAttribute('aria-hidden','true'); }

// add to cart & buy now
window.addToCart = function(id){
  const p = productos.find(x=>x.id===id);
  if(!p) return;
  const found = cart.find(i=>i.id===id);
  if(found) found.cantidad = (found.cantidad||1)+1;
  else cart.push({...p, cantidad:1});
  saveCart();
  alert(`${p.nombre} añadido al carrito`);
}

window.buyNow = function(id){
  const p = productos.find(x=>x.id===id);
  cart = [{...p, cantidad:1}];
  saveCart();
  window.location.href = 'comprar.html';
}

// cart panel toggle
document.getElementById('cart-btn').addEventListener('click', ()=>{
  const visible = cartPanel.style.display==='block';
  cartPanel.style.display = visible ? 'none' : 'block';
});

checkoutBtn.addEventListener('click', ()=>{
  localStorage.setItem('cart_v1', JSON.stringify(cart));
  window.location.href = 'comprar.html';
});

// search & sort
qInput.addEventListener('input', ()=>{ state.query = qInput.value; applyFilters(); });
sortSelect.addEventListener('change', ()=> applyFilters());

// init
renderCategories();
applyFilters();
updateCartUI();
