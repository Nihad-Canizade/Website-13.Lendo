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



// Navbar Scroll
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    let navbar = document.querySelector(".navbar");
    let navBtn = document.querySelector('.nav-btn');
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        navbar.style.backgroundColor = "black";
        navbar.style.position = "fixed";
        navBtn.style.display = "none";
        navbar.style.transition = ".3s";
    } else {
        navbar.style.backgroundColor = "";
        navbar.style.position = "";
        navBtn.style.display = "";
    }
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.style.top = "0px"
    } else {
        navbar.style.top = "40px";
    }
}


// Json data
let sec2Boxs = document.querySelector('.sec2-boxs');
let search = document.querySelector("input[type=search]");
let sort = document.getElementById('sort');
let info = [];

function getDataJson() {
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
                    <i class="bi bi-trash-fill" onclick = "boxDelete(${element.id})"></i>
                    <i class="bi bi-heart-fill" onclick = "addFavorite(${element.id})"></i>
                </div>
                <img src="${element.image}" alt="Image">
                <p class="sec2-box-p1">${element.name}</p>
                <div class="sec2-box-btns">
                    <a href = "./basket.html?id=${element.id}" target = "_blank" 
                    onclick = "addBasket(${element.id})"><button>Basket</button></a>
                    <a href = "./details.html?id=${element.id}" target = "_blank"><button>View</button></a>
                    <a href = "./update.html?id=${element.id}" target = "_blank"><button>Update</button></a>
                </div>
            </div>`
            });

            // Sort Function
            sort.addEventListener('change', (e) => {
                if (e.target.value == 'a-z') {
                    info = info.sort((a, b) => a.name.localeCompare(b.name));
                } else if (e.target.value == 'z-a') {
                    info = info.sort((a, b) => b.name.localeCompare(a.name));
                } else {
                    info = [];
                }
                getDataJson();
            });

            // Search Function
            search.addEventListener("input", (e) => {
                let filter = data.filter((el) => {
                    return el.name.startsWith(e.target.value);
                });
                sec2Boxs.innerHTML = "";
                filter.forEach(element => {
                    sec2Boxs.innerHTML += `
                    <div class="sec2-box">
                    <div class="sec2-box-icons">
                        <i class="bi bi-trash" onclick = "boxDelete(${element.id})"></i>
                        <i class="bi bi-heart-fill" onclick = "addFavorite(${element.id})"></i>
                    </div>
                    <img src="${element.image}" alt="Image">
                    <p class="sec2-box-p1">${element.name}</p>
                    <div class="sec2-box-btns">
                        <a href = "./basket.html?id=${element.id}" target = "_blank" 
                        onclick = "addBasket(${element.id})"><button>Basket</button></a>
                        <a href = "./details.html?id=${element.id}" target = "_blank"><button>View</button></a>
                        <a href = "./update.html?id=${element.id}" target = "_blank"><button>Update</button></a>
                    </div>
                </div>`
                })
            })
        })
}
getDataJson();


// Add Basket function
function addBasket(id) {
    axios.get('http://localhost:3000/boxs/' + id)
        .then(res => {
            axios.post('http://localhost:3000/basket', res.data)
        })
}


// Boxs delete function
function boxDelete(id) {
    axios.delete(`http://localhost:3000/boxs/${id}`)
    window.location.reload();
}


// Add to Favorties Function
function addFavorite(id) {
    axios.get('http://localhost:3000/boxs/' + id)
        .then(res => {
            axios.post('http://localhost:3000/favorites', res.data)
        })
}

