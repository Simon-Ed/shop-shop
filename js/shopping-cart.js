// TODO: find a better way or make global
const CART_KEY = "cart";

// adds remove event listener to all remove buttons
function addRemoveEventListeners() {
    let removeButtons = document.querySelectorAll('.removeButton')

    for (let i = 0; i< removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', function(event) {
            removeFromCart(event);
        })
    }
}

// populates cart with whats in local storage
function populateCart() {
    let items = JSON.parse(localStorage.getItem(CART_KEY));
    // let items = localStorage.getItem(CART_KEY);
    for (let i = 0; i < items.length;i++) {
        let item = items[i]


        appendItemToCartHtml(item.name, item.imageurl, item.price, item.info);
    }
    addRemoveEventListeners();

}


populateCart();

// removes a product from the html and from local storage
function removeFromCart(event) {
    let htmlProduct = event.target.closest(".product-in-cart");
    let imgSrc = htmlProduct.querySelector(".product-image").src;
    let name = htmlProduct.querySelector(".product-name").textContent;
    let price = htmlProduct.querySelector(".product-price").textContent;
    let info = htmlProduct.querySelector(".product-info").textContent;

    htmlProduct.remove();

    // remove from local storage
    let items = JSON.parse(localStorage.getItem(CART_KEY));
    if (items == null) {
        return
    }
    let newItems = [];
    let found = false;
    for (let i =0; i < items.length; i++) {
        let item = items[i];
        if (!found && !(item.name == name && item.price == price && item.info == info && item.imageurl == imgSrc)) {
            newItems.push(item);
            found = true;
        }
    }

    localStorage.setItem(CART_KEY, JSON.stringify(newItems));

}

//creates a div element and adds content to it from the json object passed to it.
function appendItemToCartHtml(name , imageurl, price, info) {
    let product = document.createElement('li');
    product.className = "product-in-cart";
    product.innerHTML = `<img src = "${imageurl}" class="product-image">
    <p>name : <span class="product-name">${name}</span></p>
    <p>price: <span class="product-price">${price}</span></p>
    <p>info :<span class=product-info>${info}</span></p>
    <button type="remove" class="removeButton">Remove</button>`

    document.querySelector('.products-in-cart').appendChild(product);
}