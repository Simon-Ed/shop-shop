let jsonobjects;
function appendItemToHtml(item) {
    let div = document.createElement('div')
    div.className = 'products-item';
    div.innerHTML = `<img src = "${item.imageurl}" class="products-item">
    <p>name : ${item.name}</p>
    <p>price: ${item.price}</p>
    <p>info :${item.info}</p>`
    document.querySelector('.products').appendChild(div)

};

function populateItems() {
    console.log(jsonobjects)
    for (let i = 0; i < jsonobjects.length; i++) {
        appendItemToHtml(jsonobjects[i])
    }
}

fetch("../json/items.json").then((response) => response.json())
.then(function (json){
    jsonobjects = json
    populateItems()
});