// Récupération du produit
let params = new URLSearchParams(window.location.search);
let productId = params.get('id');

// console.log(itemId);

// Initialisation des caractéristiques du produit
let productImage = document.getElementsByClassName('item__img');
let productTitle = document.getElementById('title');
let productPrice = document.getElementById('price');
let productDescription = document.getElementById('description');
let productColors = document.getElementById('colors');
let productQuantity = document.getElementById('quantity');
// console.log(productColors);

// Ajout d'une string vide pour l'affichage de l'image sur la page
let imageURL = '';

// Requête pour récupérer le produit dans la base de données
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((product) => {
    // console.log(product);

    // Implémentation des éléments de la page dans le code HTML
    productImage[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    imageURL = product.imageUrl;
    productTitle.innerHTML = `<h1>${product.name}</h1>`;
    productPrice.innerHTML = `${product.price}`;
    productDescription.innerHTML = `${product.description}`;

    //affichage le tableau de couleurs
    colors.innerHTML += product.colors.map(
      (colors) => `
      <option value="${colors}">${colors}</option>
      `
    );
  })

  // Affichage des erreurs
  .catch((error) => {
    alert('Error');
  });

//---------------ajout panier--------
//-----------------------------------
const btnPanier = document.getElementById('addToCart');
btnPanier.addEventListener('click', (e) => {
  e.preventDefault();

  // choisir une quantity
  if (productColors.value == '') {
    alert('Veuillez choisir une couleur');
  }
  // choisir une couleur
  else if (productQuantity.value <= 0 || productQuantity.value > 100) {
    alert('Veuillez ajouter une quantité entre 0 et 100');
  } else {
    // Récupération du produit sélectionné
    let selectedProduct = {
      name: productTitle.textContent,
      id: productId,
      price: productPrice.textContent,
      colors: productColors.value,
      quantity: productQuantity.value,
      image: imageURL,
    };
    // console.log(selectedProduct);

    //---------------- LocalStorage -------------------
    //JSON.parse convertit les données JSON du local storage en objet Javascript
    let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

    // Vérification si il y a déjà le produit enregistré dans le localStorage ou non
    let ajoutProductInLocalStorage = () => {
      productInLocalStorage.push(selectedProduct); // Récupération des données

      // Utilisation de la méthode JSON.stringify pour convertir l'objet Javascript en données JSON
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    };

    let productAjoutInPanier = () => {
      alert('Votre article a bien été ajouté dans le panier');

      // Redirection Facultative vers la page panier
      //window.location.href = 'cart.html';
    };
    console.log(productInLocalStorage);

    // Vérification de l'ajout de produit avec une méthode booléenne
    let update = false;

    // Si le produit est envoyé dans le localStorage
    if (productInLocalStorage) {
      // Pour chaque produit ajouté 'id' et 'colors'
      productInLocalStorage.forEach((productAjout, index) => {
        if (
          productAjout.id == productId &&
          productAjout.colors == productColors.value
        ) {
          productInLocalStorage[index].quantity =
            parseInt(productAjout.quantity) + parseInt(productQuantity.value);

          // Mise à jour des nouvelles valeurs du produit
          localStorage.setItem(
            'product',
            JSON.stringify(productInLocalStorage)
          );
          // Le produit ajouté est identique au produit présent dans le localStorage
          update = true;
          productAjoutInPanier(); // Confirmation de l'ajout
        }
      });
      // Si le produit est différent(possède une autre'color')
      if (!update) {
        ajoutProductInLocalStorage();
        productAjoutInPanier();
      }
    } else {
      productInLocalStorage = [];
      ajoutProductInLocalStorage();
      productAjoutInPanier();
    }
  }
});
