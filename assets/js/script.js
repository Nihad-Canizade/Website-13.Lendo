// Menu Icon
function myFunction(x) {
    x.classList.toggle("change");
}

// Menu Icon click function
let menuIcon = document.querySelector('.menu-icon');
let resNav = document.querySelector('.res-nav');
menuIcon.addEventListener('click', () => {
    if (resNav.style.display === "none") {
        resNav.style.display = "flex";
    } else {
        resNav.style.display = "none";
    }
})



// Scroll Functions (Navbar and To top button)
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    let navbar = document.querySelector(".navbar");
    let navBtn = document.querySelector('.nav-btn');
    let topBtn = document.querySelector('.top-btn');

    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        navbar.style.backgroundColor = "black";
        navbar.style.position = "fixed";
        navBtn.style.display = "none";
        navbar.style.transition = ".3s";
        topBtn.style.display = "block";  // For to top button
    } else {
        navbar.style.backgroundColor = "";
        navbar.style.position = "";
        navBtn.style.display = "";
        topBtn.style.display = "none";  // For to to button
    }

    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.style.top = "0px"
    } else {
        navbar.style.top = "40px";
    }
}


// To top button
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



// Get data Api
let sec2Boxs = document.querySelector('.sec2-boxs');
let search = document.querySelector("input[type=search]");
let sort = document.getElementById('sort');
let info = [];

function getDataApi() {
    // Fetch all
    fetch('http://localhost:3000/boxs')
        .then(response => response.json())
        .then(data => {
            sec2Boxs.innerHTML = "";
            info = info.length ? info : data;
            info.forEach(element => {
                sec2Boxs.innerHTML += `
                <div class="sec2-box">
                <div class="sec2-box-icons">
                    <i class="bi bi-heart-fill" onclick = "addFavorite(${element.id})"></i>
                </div>
                <img src="${element.image}" alt="Image">
                <p class="sec2-box-p1">${element.name}</p>
                <p class="sec2-box-p2">$${element.price}.00</p>
                <div class="sec2-box-btns">
                    <a href = "./basket.html?id=${element.id}" target = "_blank" 
                    onclick = "addBasket(${element.id})"><button>Basket</button></a>
                    <a href = "./details.html?id=${element.id}" target = "_blank"><button>View</button></a>
                </div>
            </div>`
            });

            // Sort Function
            sort.addEventListener('change', (e) => {
                if (e.target.value == 'descending') {
                    info = info.sort((a, b) => b.price - a.price);
                } else if (e.target.value == 'ascending') {
                    info = info.sort((a, b) => a.price - b.price);
                } else {
                    info = [];
                }
                getDataApi();
            });

            // Search Function
            search.addEventListener("input", (e) => {
                let filter = data.filter((el) => {
                    return el.name.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase());
                });
                sec2Boxs.innerHTML = "";
                filter.forEach(element => {
                    sec2Boxs.innerHTML += `
                    <div class="sec2-box">
                    <div class="sec2-box-icons">
                        <i class="bi bi-heart-fill" onclick = "addFavorite(${element.id})"></i>
                    </div>
                    <img src="${element.image}" alt="Image">
                    <p class="sec2-box-p1">${element.name}</p>
                    <div class="sec2-box-btns">
                        <a href = "./basket.html?id=${element.id}" target = "_blank" 
                        onclick = "addBasket(${element.id})"><button>Basket</button></a>
                        <a href = "./details.html?id=${element.id}" target = "_blank"><button>View</button></a>
                    </div>
                </div>`
                })
            })
        })
}
getDataApi();


// Add Basket function
function addBasket(id) {
    axios.get('http://localhost:3000/boxs/' + id)
        .then(res => {
            axios.post('http://localhost:3000/basket', res.data)
        })
}


// Add to Favorties Function
function addFavorite(id) {
    axios.get('http://localhost:3000/boxs/' + id)
        .then(res => {
            axios.post('http://localhost:3000/favorites', res.data)
        })
}

