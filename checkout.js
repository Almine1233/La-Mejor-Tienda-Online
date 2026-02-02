const total = localStorage.getItem("total");
const totalElement = document.getElementById("checkout-total");

if (total) {
  totalElement.textContent = total + " €";
}
