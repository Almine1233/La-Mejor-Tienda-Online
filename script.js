function goToPayment() {
  document.getElementById("shipping").classList.add("hidden");
  document.getElementById("payment").classList.remove("hidden");

  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-2").classList.add("active");
}

function goToConfirmation() {
  document.getElementById("payment").classList.add("hidden");
  document.getElementById("confirmation").classList.remove("hidden");

  document.getElementById("step-2").classList.remove("active");
  document.getElementById("step-3").classList.add("active");
}
