let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const cont = document.getElementById("productos")
const buscador = document.getElementById("buscador")

function render(lista){
  cont.innerHTML=""
  lista.forEach(p=>{
    cont.innerHTML+=`
    <div class="producto">
      <img src="${p.img}">
      <h4>${p.n}</h4>
      <p>${p.p} €</p>
      <button onclick="add(${p.id})">Añadir</button>
    </div>`
  })
}
render(productos)

buscador.oninput=()=>{
  render(productos.filter(p=>p.n.toLowerCase().includes(buscador.value.toLowerCase())))
}

function add(id){
  carrito.push(productos.find(p=>p.id===id))
  localStorage.setItem("carrito",JSON.stringify(carrito))
  renderCarrito()
}

function renderCarrito(){
  const ul=document.getElementById("listaCarrito")
  ul.innerHTML=""
  let t=0
  carrito.forEach(p=>{
    t+=p.p
    ul.innerHTML+=`<li>${p.n} - ${p.p}€</li>`
  })
  document.getElementById("total").innerText=t
}
renderCarrito()

function toggleCarrito(){
  const c=document.getElementById("carrito")
  c.style.display=c.style.display==="block"?"none":"block"
}

function toggleMenu(){
  document.getElementById("menu").classList.toggle("open")
}

function toggleTheme(){
  document.documentElement.dataset.theme=
    document.documentElement.dataset.theme==="dark"?"":"dark"
}

if(window.matchMedia('(prefers-color-scheme: dark)').matches){
  document.documentElement.dataset.theme="dark"
}
