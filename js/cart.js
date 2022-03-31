let products = [];
// console.log(products);

// Récupère les données (construit en JS)
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

// Afficher les produits
// Si le panier est vide
if (productInLocalStorage === null || productInLocalStorage == 0) {
  // console.log("Je suis vide");
  // Incrémentation du code HTML pour l'affichage du panier vide
  document.getElementById('panier__vide').innerHTML = `
      <div class="cart__empty">
        <h2>Aucun article dans votre panier</h2>
      </div>
    `;
} else {
  // console.log("Je ne suis pas vide");
  //Affichage des produits dans le localStorage
  let productsPanier = [];

  for (k = 0; k < productInLocalStorage.length; k++) {
    // La méthode .push() récupère uniquement l'id de chaque produit dans le panier
    products.push(productInLocalStorage[k].id);

    //Incrémentation du code à chaque tour de boucle(for)
    productsPanier =
      //concatenation pour que le produit s'ajoute au productsPanier[] sans ecrasé le précédent
      productsPanier +
      `  
        <article class="cart__item" data-id="${productInLocalStorage[k].id}" data-color="${productInLocalStorage.color}">         
            <div class="cart__item__img">
                <img src="${productInLocalStorage[k].image}" alt="${productInLocalStorage[k].alt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${productInLocalStorage[k].name}</h2>
                    <p>${productInLocalStorage[k].colors}</p>
                    <p>${productInLocalStorage[k].price} €</p>
                </div>          
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[k].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
      `;
  }

  if (k === productInLocalStorage.length) {
    // Integration du code HTML et affichage sur la page panier
    const cartItems = document.getElementById('cart__items');
    cartItems.innerHTML += productsPanier;
  }

  //-----------Supprimer un produit(fonction dedié)----------
  supprimeProduct = () => {
    let deleteItem = document.getElementsByClassName('deleteItem');
    //console.log(deleteItem);

    for (let m = 0; m < deleteItem.length; m++) {
      deleteItem[m].addEventListener('click', (e) => {
        e.preventDefault();
        //enregistrement id et colors select par le btn supprime
        let supprimeId = productInLocalStorage[m].id;
        let supprimeColors = productInLocalStorage[m].colors;

        console.log('supprimeId:' + supprimeId); //affichage id supprime
        console.log('supprimeColors:' + supprimeColors);
        //element a garder avec filter
        productInLocalStorage = productInLocalStorage.filter(
          (el) => el.id !== supprimeId || el.colors !== supprimeColors
        );
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        alert('Votre produit a bien été supprimer');
        window.location.href = 'cart.html'; //raffraichir la page
      });
    }
  };
  supprimeProduct();

  //-----------Calcul montant total-----------
  calculTotal = () => {
    let calculPrix = [];

    for (t = 0; t < productInLocalStorage.length; t++) {
      let panierTotal =
        productInLocalStorage[t].price * productInLocalStorage[t].quantity;
      calculPrix.push(panierTotal);
      //fonction.reduce garde en mémoire les résultats a chaque calcul en cumulant les ajoutant/suppression
      let reducer = (accumulateur, valeurCourante) =>
        accumulateur + valeurCourante;
      total = calculPrix.reduce(reducer);

      console.log('reducer:' + total);
    }
    //affichage du prix total
    let totalPrix = document.getElementById('totalPrice');
    totalPrix.textContent = total;
  };
  calculTotal();

  //------affichage total(articles)---------
  totalProducts = () => {
    let totalItems = 0;

    for (e in productInLocalStorage) {
      // Analyse et converti la valeur 'quantity' dans le localstorage en une chaîne, et renvoie un entier(parseInt)
      const newQuantity = parseInt(productInLocalStorage[e].quantity, 10);

      // Attribue la valeur retournée par parseInt à la variable totalItems
      totalItems += newQuantity;
    }
    const totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalItems;
  };
}
totalProducts();
//------ajout de produit dans la page panier-------
changeQuantity = () => {
  let itemQuantity = document.getElementsByClassName('itemQuantity');

  for (let q = 0; q < itemQuantity.length; q++) {
    itemQuantity[q].addEventListener('change', (e) => {
      e.preventDefault();
      //initialisation new tableau pour la new quantity
      let itemNewQuantity = itemQuantity[q].value;
      const newLocalStorage = {
        id: productInLocalStorage[q].id,
        image: productInLocalStorage[q].image,
        alt: productInLocalStorage[q].alt,
        name: productInLocalStorage[q].name,
        color: productInLocalStorage[q].colors,
        price: productInLocalStorage[q].price,
        quantity: itemNewQuantity,
      };
      //remplacement LS avec new quantity
      productInLocalStorage[q] = newLocalStorage;
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));
      alert('Panier mis à jour');

      //actualisation quantity et total
      calculTotal();
      totalProducts();
    });
  }
};
changeQuantity();
//----------------------------------
//----------Formulaire--------------
let form = document.querySelector('cart__order__form');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
let commander = document.getElementById('order');

//---Expression régulière (regex)prénom---
firstName.addEventListener('change', function () {
  validFirstName(this);
});
const validFirstName = (inputFirstName) => {
  //creation de regexp pour la validation
  let firstNameRegExp = new RegExp(
    '^([a-zA-Z=e=ïçà]+[s-]{1}[a-zA-Z=e=ïçà]+)|([a-zA-Z=e=ïçà]+)$',
    'g'
  );
  let firstNameErrorMsg = inputFirstName.nextElementSibling; //attrape la valeur suivante
  if (firstNameRegExp.test(inputFirstName.value)) {
    firstNameErrorMsg.textContent = 'prénom valide';
    return true;
  } else {
    firstNameErrorMsg.textContent = 'Veuillez renseigner votre prénom';
    return false;
  }
};
//---Expression régulière (regex)nom---
lastName.addEventListener('change', function () {
  validLastName(this);
});
const validLastName = (inputLastName) => {
  //creation de regexp pour la validation
  let lastNameRegExp = new RegExp(
    '^([a-zA-Z=e=ïçà]+[s-]{1}[a-zA-Z=e=ïçà]+)|([a-zA-Z=e=ïçà]+)$',
    'g'
  );
  let lastNameErrorMsg = inputLastName.nextElementSibling;
  if (lastNameRegExp.test(inputLastName.value)) {
    lastNameErrorMsg.textContent = 'nom valide';
    return true;
  } else {
    lastNameErrorMsg.textContent = ' Veuillez renseigner votre nom';
    return false;
  }
};
//---Expression régulière (regex)adresse---
address.addEventListener('change', function () {
  validAddress(this);
});
const validAddress = (inputAddress) => {
  //creation de regexp pour la validation
  let addressRegExp = new RegExp('^([0-9)+[a-zA-Z\x20]+)$', 'g');
  let addressErrorMsg = inputAddress.nextElementSibling;
  if (addressRegExp.test(inputAddress.value)) {
    addressErrorMsg.textContent = 'adresse valide';
    return true;
  } else {
    addressErrorMsg.textContent = ' Veuillez renseigner votre adresse';
    return false;
  }
};
//---Expression régulière (regex)ville---
city.addEventListener('change', function () {
  validCity(this);
});
const validCity = (inputCity) => {
  //creation de regexp pour la validation
  let cityRegExp = new RegExp(
    '^([a-zA-Z=e=ïçà]+[s-]{1}[a-zA-Z=e=ïçà]+)|([a-zA-Z=e=ïçà]+)$',
    'g'
  );
  let cityErrorMsg = inputCity.nextElementSibling; //attrape la valeur suivante
  if (cityRegExp.test(inputCity.value)) {
    cityErrorMsg.textContent = 'ville valide';
    return true;
  } else {
    cityErrorMsg.textContent = ' Veuillez renseigner votre ville';
    return false;
  }
};
//---Expression régulière (regex)email---
email.addEventListener('change', function () {
  validEmail(this);
});
const validEmail = (inputEmail) => {
  //creation de regexp pour la validation
  let emailRegExp = new RegExp(
    '^([a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10})$',
    'g'
  );
  let emailErrorMsg = inputEmail.nextElementSibling; //attrape la valeur suivante
  if (emailRegExp.test(inputEmail.value)) {
    emailErrorMsg.textContent = 'email valide';
    return true;
  } else {
    emailErrorMsg.textContent = ' Veuillez renseigner votre email';
    return false;
  }
};
//Validation des inputs---
validInputs = () => {
  return (
    validFirstName(document.querySelector('#firstName')) &&
    validLastName(document.querySelector('#lastName')) &&
    validAddress(document.querySelector('#address')) &&
    validCity(document.querySelector('#city')) &&
    validEmail(document.querySelector('#email'))
  );
};
//Validation formulaire---
validForm = () => {
  const commander = document.getElementById('order');
  commander.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validInputs()) {
      alert('Veuillez renseigner tous les champs');
      return false;
    }
    //envoie des informations
    const contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };
    //envoie les données dan LS
    //localStorage.setItem('contact', JSON.stringify(contact)); //données utilisateur

    //récupération des données du formulaire et des products dans un objet
    const objet = {
      contact,
      products,
    };
    //envoi des données du formulaire et des products au serveur avec POST
    const validation = {
      method: 'post',
      body: JSON.stringify(objet),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch('http://localhost:3000/api/products/order', validation)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let orderId = data.orderId;
        window.location.href = `./confirmation.html?id=${orderId}`;
      });
  });
};
validForm();
