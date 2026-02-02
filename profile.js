const grid = document.getElementById("myProducts");
const user = localStorage.getItem("user");
const products = JSON.parse(localStorage.getItem("userProducts")) || [];

const mine = products.filter(p => p.owner === user);

mine.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${p.image}">
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div class="price">${p.price} €</div>
  `;
  grid.appendChild(card);
});
