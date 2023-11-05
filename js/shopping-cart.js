// TODO: find a better way or make global
const CART_KEY = "cart";

// populates cart with whats in local storage
function populateCart() {
    let items = JSON.parse(localStorage.getItem(CART_KEY));
    // let items = localStorage.getItem(CART_KEY);
    for (let i = 0; i < items.length;i++) {
        let item = items[i]
        console.log(item.name)


        appendItemToCartHtml(item.name, item.imageurl, item.price, item.info);
    }
}

populateCart();

//TODO: Make more general
//creates a div element and adds content to it from the json object passed to it.
function appendItemToCartHtml(name , imageurl, price, info) {
    let product = document.createElement('li');
    product.className = "product-in-cart";
    product.innerHTML = `<img src = "${imageurl}" class="product-image">
    <p>name : <span class="product-name">${name}</span></p>
    <p>price: <span class="product-price">${price}</span></p>
    <p>info :<span class=product-info>${info}</span></p>`

    document.querySelector('.products-in-cart').appendChild(product);
}