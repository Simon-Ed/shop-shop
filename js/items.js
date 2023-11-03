class product {
    constructor(name, price, info, imageurl){
        this.name = name
        this.price = price
        this.info = info
        this.imageurl = imageurl
    }
    generatDiv() {
    let div = document.createElement('div')
    div.className = 'products-item';
    div.innerHTML = `<img src = "${this.imageurl}" class="products-item">
    <p>name : ${this.name}</p>
    <p>price: ${this.price}</p>
    <p>info :${this.info}</p>`
    return div
    }

}


function convertJsonToProduct(item){
    return new product(item.name,item.price,item.info,item.imageurl)
}

let jsonobjects;


//creates a div element and adds content to it from the json object passed to it.
function appendItemToHtml(item) {
    let div = item.generatDiv()
    console.log(div)
    document.querySelector('.products').appendChild(div)

};
//takes a filter, defined by the selection box, and populates the webpage with the items that match the filter.
function populateItems(filter) {
    document.querySelector('#product-item').textContent = filter
    document.querySelector('.products').innerHTML = ''
    for (let i = 0; i < jsonobjects.length; i++) {
        if (filter == 'all' || filter == jsonobjects[i].type) {
            appendItemToHtml(convertJsonToProduct(jsonobjects[i]))
        }
    }
}
//fetches the json data and populates the webpage on first load.
fetch("../json/items.json").then((response) => response.json())
    .then(function (json) {
        jsonobjects = json
        populateItems('all')
    });
//repopulates the webpage each time a filter value is selected.
document.querySelector('#products').addEventListener('click', function (event) {
    console.log(this.value)
    populateItems(this.value)
})