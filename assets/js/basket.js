// Add Basket Function
let id = new URLSearchParams(window.location.search).get("id");
let basket = document.querySelector(".secb-boxs");

function forBasket() {
    fetch('http://localhost:3000/basket')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                basket.innerHTML += `
                <div class="secb-box">
                <img src="${element.image}" alt="Image">
                <p class="secb-box-p1">${element.name}</p>
                <p class="secb-box-p2">$${element.price}</p>
                <i class="bi bi-trash-fill" onclick= "deleteItem(${element.id})"></i>
            </div>`
            })
        })
}

forBasket();


// Delete Basket function
let rmvBtn = document.querySelector(".bi-trash-fill");

const deleteItem = (id) => {
    axios.delete('http://localhost:3000/basket/' + id)
        .then(res => {
            console.log(res.data);
            window.location.reload();
        })
}