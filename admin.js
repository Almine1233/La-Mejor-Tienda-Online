const form = document.getElementById("product-form");
const list = document.getElementById("admin-products");

let products = JSON.parse(localStorage.getItem("products")) || [];

function render() {
  list.innerHTML = "";
  products.forEach((p, i) => {
    list.innerHTML += `
      <div class="admin-card">
        <img src="${p.image}">
        <h3>${p.title}</h3>
        <p>${p.price} €</p>
        <p>${p.category}</p>
        <button class="delete" onclick="remove(${i})">Eliminar</button>
      </div>
    `;
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const file = image.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    products.push({
      title: title.value,
      price: price.value,
      category: category.value,
      description: description.value,
      image: reader.result
    });

    localStorage.setItem("products", JSON.stringify(products));
    render();
    form.reset();
  };

  if (file) reader.readAsDataURL(file);
});

function remove(i) {
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  render();
}

render();
