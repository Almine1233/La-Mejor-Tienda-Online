function addComment(id) {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    alert("Inicia sesión");
    return;
  }

  const input = document.getElementById(`comment-${id}`);
  const text = input.value;

  if (!text) return;

  const comments = JSON.parse(localStorage.getItem("comments")) || {};
  if (!comments[id]) comments[id] = [];

  comments[id].push({ user, text });
  localStorage.setItem("comments", JSON.stringify(comments));
  location.reload();
}

function renderComments(id) {
  const comments = JSON.parse(localStorage.getItem("comments")) || {};
  return (comments[id] || [])
    .map(c => `<p><b>${c.user}</b>: ${c.text}</p>`)
    .join("");
}
