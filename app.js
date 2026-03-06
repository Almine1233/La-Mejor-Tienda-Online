const products = [

{
id:1,
name:"Auriculares Pro",
price:89,
image:"https://picsum.photos/400/300?1",
seller:"techstore"
},

{
id:2,
name:"Smartwatch X",
price:129,
image:"https://picsum.photos/400/300?2",
seller:"gadgetshop"
},

{
id:3,
name:"Teclado Mecánico",
price:99,
image:"https://picsum.photos/400/300?3",
seller:"gamingstore"
},

{
id:4,
name:"Ratón Gaming",
price:59,
image:"https://picsum.photos/400/300?4",
seller:"gamingstore"
},

{
id:5,
name:"Tablet Pro",
price:299,
image:"https://picsum.photos/400/300?5",
seller:"techstore"
}

]

let cart = JSON.parse(localStorage.getItem("cart")) || []

const grid = document.getElementById("product-grid")
const cartItems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const cartCount = document.getElementById("cart-count")

/* RENDER PRODUCTS */

function renderProducts(){

products.forEach(p=>{

grid.innerHTML+=`

<div class="card product">

<img src="${p.image}">

<h3>${p.name}</h3>

<div class="price">${p.price} €</div>

<p>Vendedor: ${p.seller}</p>

<button onclick="follow('${p.seller}')">

Seguir (${followers(p.seller)})

</button>

<button onclick="addToCart(${p.id})">

Añadir al carrito

</button>

</div>

`

})

}

/* FOLLOW SELLER */

let follows = JSON.parse(localStorage.getItem("follows")) || {}

function follow(name){

if(!follows[name]){

follows[name]=1

}else{

follows[name]++

}

localStorage.setItem("follows",JSON.stringify(follows))

location.reload()

}

function followers(name){

return follows[name] || 0

}

/* CART */

function addToCart(id){

const product = products.find(p=>p.id===id)

cart.push(product)

saveCart()

}

function removeItem(index){

cart.splice(index,1)

saveCart()

}

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart))

updateCart()

}

function updateCart(){

if(!cartItems) return

cartItems.innerHTML=""

let total=0

cart.forEach((item,i)=>{

total+=item.price

cartItems.innerHTML+=`

<li>

${item.name}

<span>

${item.price}€

<button onclick="removeItem(${i})">✖</button>

</span>

</li>

`

})

cartTotal.textContent=total

cartCount.textContent=cart.length

}

/* SEARCH */

const search=document.getElementById("search")

search.addEventListener("keyup",function(){

let filter=search.value.toLowerCase()

let products=document.querySelectorAll(".product")

products.forEach(p=>{

let name=p.querySelector("h3").textContent.toLowerCase()

if(name.includes(filter)){

p.style.display="block"

}else{

p.style.display="none"

}

})

})

/* FIRST VISIT */

if(!localStorage.getItem("visited")){

alert("👋 Bienvenido a MiMarketplace")

localStorage.setItem("visited","true")

}

/* INIT */

renderProducts()

updateCart()
