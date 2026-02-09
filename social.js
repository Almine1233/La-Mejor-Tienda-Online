function toggleLike(id) {
  const user = localStorage.getItem("currentUser");
  if (!user) return alert("Inicia sesión");

  const likes = JSON.parse(localStorage.getItem("likes")) || {};
  likes[id] = likes[id] || [];

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

/* FOLLOW */

function follow(seller) {
  const user = localStorage.getItem("currentUser");
  if (!user) return alert("Inicia sesión");

  const follows = JSON.parse(localStorage.getItem("follows")) || {};
  follows[seller] = follows[seller] || [];

  if (!follows[seller].includes(user)) {
    follows[seller].push(user);
    localStorage.setItem("follows", JSON.stringify(follows));
  }
}

function followers(seller) {
  const follows = JSON.parse(localStorage.getItem("follows")) || {};
  return follows[seller] ? follows[seller].length : 0;
}
