const orderId = document.getElementById('orderId');

confirmation = () => {
  //affichage du numero de commande
  orderId.innerHTML = localStorage.getItem('orderId');

  //effacer la mémoire (ni conservé/ni stocké)
  localStorage.clear();
};
confirmation();
