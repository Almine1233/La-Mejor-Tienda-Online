function register() {
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Email obligatorio");
    return;
  }
  localStorage.setItem("user", email);
  window.location.href = "index.html";
}

function login() {
  const user = localStorage.getItem("user");
  if (!user) {
    alert("No existe usuario");
    return;
  }
  window.location.href = "index.html";
}
