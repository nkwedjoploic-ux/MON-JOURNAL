const password = localStorage.getItem("utilisateurActif");
const users = JSON.parse(localStorage.getItem("users")) || {};
if (users[password]) {
  const { nom, prenom} = users[password];
  document.getElementById("bienvenue").innerText = `Bienvenue, ${prenom} ${nom}`;
}

function enregistrerJournal() {
  const contenu = document.getElementById("journalEntry").value.trim();
  if (contenu === "") {
    alert("Veuillez écrire quelque chose.");
    return;
}

  const date = new Date().toLocaleString();
  const key = `journaux_${password}`;
  let journaux = JSON.parse(localStorage.getItem(key)) || [];

  journaux.push({ contenu, date});
  localStorage.setItem(key, JSON.stringify(journaux));

  document.getElementById("journalEntry").value = "";
  afficherJournaux();
}

function afficherJournaux() {
  const container = document.getElementById("journalList");
  container.innerHTML = "";

  const key = `journaux_${password}`;
  const journaux = JSON.parse(localStorage.getItem(key)) || [];

  if (journaux.length === 0) {
    container.innerHTML = "<p>Aucun journal enregistré pour le moment.</p>";
    return;
}

  journaux.slice().reverse().forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "journal-entry";

    div.innerHTML = `
      <strong>${entry.date}</strong>
      <p>${entry.contenu}</p>
      <button onclick="modifierJournal(${journaux.length - 1 - index})">✏ Modifier</button>
      <button onclick="supprimerJournal(${journaux.length - 1 - index})">🗑 Supprimer</button>
    `;

    container.appendChild(div);
});
}

function modifierJournal(index) {
  const key = `journaux_${password}`;
  const journaux = JSON.parse(localStorage.getItem(key)) || [];

  const nouveauContenu = prompt("Modifie ton journal:", journaux[index].contenu);
  if (nouveauContenu!== null && nouveauContenu.trim()!== "") {
    journaux[index].contenu = nouveauContenu.trim();
    localStorage.setItem(key, JSON.stringify(journaux));
    afficherJournaux();
}
}

function supprimerJournal(index) {
  const key = `journaux_${password}`;
  let journaux = JSON.parse(localStorage.getItem(key)) || [];

if (confirm("Voulez-vous vraiment supprimer ce journal?")) {
    journaux.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(journaux));
    afficherJournaux();
}
}

window.onload = afficherJournaux;


