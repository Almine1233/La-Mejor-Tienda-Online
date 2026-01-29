const form = document.querySelector(".checkout-form");
const pago = document.getElementById("pago");
const steps = document.querySelectorAll(".checkout-step");

form.querySelector("button").addEventListener("click", () => {
  const inputs = form.querySelectorAll("input");
  let ok = true;

  inputs.forEach(i => {
    if (!i.value) {
      i.style.border = "2px solid red";
      ok = false;
    }
  });

  if (!ok) return;

  form.classList.add("hidden");
  pago.classList.remove("hidden");

  steps[0].classList.remove("active");
  steps[1].classList.add("active");

  localStorage.setItem("checkoutData", JSON.stringify(
    [...inputs].map(i => i.value)
  ));
});
const saved = JSON.parse(localStorage.getItem("checkoutData"));
if (saved) {
  document.querySelectorAll(".checkout-form input")
    .forEach((input, i) => input.value = saved[i]);
}
