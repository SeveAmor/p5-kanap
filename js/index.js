let productKanap = [];

const getArticles = async () => {
  await fetch('http://localhost:3000/api/products') //recuperation article API
    .then((response) => response.json())
    .then((promise) => {
      productKanap = promise;
      console.log(productKanap);
    });
};
//creation de chaque produit
const displayArticles = async () => {
  await getArticles();

  //incrémentation de la balise 'items' pour afficher les produits, .map pour la boucle
  document.getElementById('items').innerHTML = productKanap.map(
    (product) =>
      `<a href="./product.html?id=${product._id}">
    <article> 
        <img src=${product.imageUrl} alt=${product.altTxt}>
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
    </article> `
  );
};
displayArticles();
