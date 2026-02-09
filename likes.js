function toggleLike(id) {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    alert("Inicia sesión para dar like");
    return;
  }

  const likes = JSON.parse(localStorage.getItem("likes")) || {};

  if (!likes[id]) likes[id] = [];

  if (likes[id].includes(user)) {
    likes[id] = likes[id].filter(u => u !== user);
  } else {
    likes[id].push(user);
  }

  localStorage.setItem("likes", JSON.stringify(likes));
  location.reload();
}

function countLikes(id) {
  const likes = JSON.parse(localStorage.getItem("likes")) || {};
  return likes[id] ? likes[id].length : 0;
}
