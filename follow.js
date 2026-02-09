function follow(seller) {
  const user = localStorage.getItem("currentUser");
  if (!user) return alert("Inicia sesión");

  const follows = JSON.parse(localStorage.getItem("follows")) || {};
  if (!follows[seller]) follows[seller] = [];

  if (!follows[seller].includes(user)) {
    follows[seller].push(user);
    localStorage.setItem("follows", JSON.stringify(follows));
  }
}

function followers(seller) {
  const follows = JSON.parse(localStorage.getItem("follows")) || {};
  return follows[seller] ? follows[seller].length : 0;
}
