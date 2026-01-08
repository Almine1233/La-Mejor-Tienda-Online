if(localStorage.getItem("admin")!=="true"){
  location.href="login.html";
}

let productos = JSON.parse(localStorage.getItem("productos")) || [];

const lista = document.getElementById("lista");

function render(){
  lista.innerHTML="";
  productos.forEach((p,i)=>{
    lista.innerHTML += `
      <li>
        ${p.nombre} - ${p.precio}€
        <button onclick="del(${i})">🗑</button>
      </li>
    `;
  });
  localStorage.setItem("productos", JSON.stringify(productos));
}

function add(){
  productos.push({
    nombre:nombre.value,
    precio:precio.value,
    categoria:categoria.value,
    img:img.value
  });
  render();
}

function del(i){
  productos.splice(i,1);
  render();
}

function logout(){
  localStorage.removeItem("admin");
  location.href="index.html";
}

render();
