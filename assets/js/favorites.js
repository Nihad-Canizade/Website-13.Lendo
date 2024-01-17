// Add Favorite Function
let id = new URLSearchParams(window.location.search).get("id");
let favorites = document.querySelector(".sec2-boxs");

function forFavorites() {
    fetch('http://localhost:3000/favorites')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                favorites.innerHTML += `
    <div class="sec2-box">
    <img src="${element.image}" alt="Image">
    <div class="sec2-box-p1">${element.name}</div>
    <button class ="rmv-fav-btn" onclick= "deleteItem(${element.id})">Remove from favorites</button>
 </div>
    `
            })
        })
}

forFavorites();


// Delete Favorite Function
let rmvBtn = document.querySelector(".rmv-fav-btn");

const deleteItem = (id) => {
    axios.delete('http://localhost:3000/favorites/' + id)
        .then(res => {
            console.log(res.data);
            window.location.reload();
        })
}