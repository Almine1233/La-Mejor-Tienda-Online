const form = document.getElementById("productForm");

form.addEventListener("submit", e => {
  e.preventDefault();

  const user = localStorage.getItem("user");
  if (!user) {
    alert("Debes iniciar sesión");
    return;
  }

  const product = {
    id: Date.now(),
    owner: user,
    name: name.value,
    price: price.value,
    image: image.value,
    desc: desc.value
  };

  const products = JSON.parse(localStorage.getItem("userProducts")) || [];
  products.push(product);
  localStorage.setItem("userProducts", JSON.stringify(products));

  alert("Producto publicado");
  window.location.href = "index.html";
});
