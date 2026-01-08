const productos = JSON.parse(localStorage.getItem("productos")) || [
  {id:1,n:"AirPods Pro",p:249,c:"Tecnología",img:"https://source.unsplash.com/400x300/?airpods"},
  {id:2,n:"PC Gaming",p:1299,c:"Gaming",img:"https://source.unsplash.com/400x300/?gaming-pc"},
  {id:3,n:"Altavoz Bluetooth",p:89,c:"Audio",img:"https://source.unsplash.com/400x300/?speaker"},
  {id:4,n:"Smartphone",p:699,c:"Tecnología",img:"https://source.unsplash.com/400x300/?smartphone"},
  {id:5,n:"Teclado Mecánico",p:120,c:"Gaming",img:"https://source.unsplash.com/400x300/?keyboard"}
]

localStorage.setItem("productos",JSON.stringify(productos))
