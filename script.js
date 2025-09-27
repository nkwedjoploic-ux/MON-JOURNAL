function inscription() {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const password = document.getElementById("password").value;

  if (!nom ||!prenom ||!password) {
    alert("Veuillez remplir tous les champs.");
    return;
}

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[password]) {
    alert("Ce mot de passe est déjà utilisé. Choisissez-en un autre.");
    return;
}

  users[password] = { nom, prenom};
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("utilisateurActif", password);
  window.location.href = "index2.html";
}

function connexion() {
  const password = document.getElementById("loginPassword").value;
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[password]) {
    alert("Mot de passe incorrect ou compte inexistant.");
    return;
}

  localStorage.setItem("utilisateurActif", password);
  window.location.href = "index2.html";
}
