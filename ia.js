<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Modo IA</h2>
<div id="chat"></div>

<input id="msg" placeholder="Pregunta a la IA">
<button onclick="enviar()">Enviar</button>

<script src="ia.js"></script>
<script>
function enviar() {
  const msg = document.getElementById("msg").value;
  const chat = document.getElementById("chat");

  chat.innerHTML += `<p><strong>Tú:</strong> ${msg}</p>`;
  chat.innerHTML += `<p><strong>IA:</strong> ${responderIA(msg)}</p>`;
}
</script>

</body>
</html>
