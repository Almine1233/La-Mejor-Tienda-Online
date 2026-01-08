if(localStorage.getItem("session")!=="admin"){
  location.href="login.html";
}

let products=JSON.parse(localStorage.getItem("products"))||[];

const list=document.getElementById("list");

function render(){
  list.innerHTML="";
  products.forEach((p,i)=>{
    list.innerHTML+=`
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${p.price}€</p>
        <button class="btn" onclick="del(${i})">Eliminar</button>
      </div>
    `;
  });
}

function add(){
  const f=document.getElementById("img").files[0];
  const r=new FileReader();

  r.onload=()=>{
    products.push({
      id:Date.now(),
      name:name.value,
      price:+price.value,
      cat:cat.value,
      img:r.result
    });
    localStorage.setItem("products",JSON.stringify(products));
    render();
  };
  r.readAsDataURL(f);
}

function del(i){
  products.splice(i,1);
  localStorage.setItem("products",JSON.stringify(products));
  render();
}

render();
