class product {
    constructor(name, price, info, imageurl) {
        this.name = name
        this.price = price
        this.info = info
        this.imageurl = imageurl
    }
    generatDiv() {
        let div = document.createElement('div')
        div.className = 'products-item';
        div.innerHTML = `<img src = "${this.imageurl}" class="product-image">
    <p>name : <span class="product-name">${this.name}</span></p>
    <p>price: <span class="product-price">${this.price}</span></p>
    <p>info :<span class=product-info>${this.info}</span></p>
    <button type="button" class="button">Add to cart</button> `
        return div
    }

}


function convertJsonToProduct(item) {
    return new product(item.name, item.price, item.info, item.imageurl)
}

let jsonobjects;


//creates a div element and adds content to it from the json object passed to it.
function appendItemToHtml(item) {
    let div = item.generatDiv()
    document.querySelector('.products').appendChild(div)

};
//adds eventlisteners to the buttons on the page.
function addEventListeners() {
    let buttons = document.querySelectorAll('.button')
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (event) {
            onClickProduct(event);
        })
    }
}

//takes a filter, defined by the selection box, and populates the webpage with the items that match the filter.
function populateItems(filter) {
    document.querySelector('#product-item').textContent = filter
    document.querySelector('.products').innerHTML = ''
    for (let i = 0; i < jsonobjects.length; i++) {
        if (filter == 'all' || filter == jsonobjects[i].type) {
            appendItemToHtml(convertJsonToProduct(jsonobjects[i]))
        }
    }
    addEventListeners()
}
//fetches the json data and populates the webpage on first load.
fetch("../json/items.json").then((response) => response.json())
    .then(function (json) {
        jsonobjects = json
        populateItems('all')
    });
//repopulates the webpage each time a filter value is selected.
document.querySelector('#products').addEventListener('change', function (event) {
    console.log(this.value)
    populateItems(this.value)
})


// TODO: find a better way or make global
const CART_KEY = "cart";

function addToCart(item) {
    let list = JSON.parse(localStorage.getItem(CART_KEY));
    if (list == null) {
        list = [];
    }
    list.push(item);
    localStorage.setItem(CART_KEY, JSON.stringify(list));
}



/**
 * When a product is clicked the product will be added to cart
 */
function onClickProduct(event){
    let htmlProduct = event.target.closest(".products-item");
    let imgSrc = htmlProduct.querySelector(".product-image").src;
    let name = htmlProduct.querySelector(".product-name").textContent;
    let price = htmlProduct.querySelector(".product-price").textContent;
    let info = htmlProduct.querySelector(".product-info").textContent;
    addToCart(new product(name , price,info,imgSrc));
    event.target.textContent = "Added to cart";
    event.target.disabled = true;
}

