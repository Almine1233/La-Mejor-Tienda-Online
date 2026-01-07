// REGISTRO
function register() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (!user || !pass) {
    alert("Completa todos los campos");
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  alert("Cuenta creada correctamente");
  window.location.href = "login.html";
}

// LOGIN
function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  const savedUser = localStorage.getItem("user");
  const savedPass = localStorage.getItem("pass");

  if (user === savedUser && pass === savedPass) {
    localStorage.setItem("logged", "true");
    window.location.href = "mi-cuenta.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// PROTECCIÓN DE PÁGINAS
function protect() {
  if (localStorage.getItem("logged") !== "true") {
    window.location.href = "login.html";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("logged");
  window.location.href = "index.html";
}
