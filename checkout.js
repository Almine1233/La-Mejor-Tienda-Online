const cart = JSON.parse(localStorage.getItem("cart")) || [];
const summary = document.getElementById("summary");
const totalEl = document.getElementById("total");

let total = 0;

cart.forEach(item => {
  total += item.price;
  const li = document.createElement("li");
  li.textContent = `${item.name} - ${item.price} €`;
  summary.appendChild(li);
});

totalEl.textContent = total;

checkoutForm.addEventListener("submit", e => {
  e.preventDefault();

  const order = {
    id: "ORD-" + Date.now(),
    user: localStorage.getItem("user"),
    items: cart,
    shipping: {
      name: name.value,
      address: address.value,
      city: city.value
    },
    total,
    status: "pending"
  };

  localStorage.setItem("lastOrder", JSON.stringify(order));
  alert("Pedido preparado (listo para pago)");
});
