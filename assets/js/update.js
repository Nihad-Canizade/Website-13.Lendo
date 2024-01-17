let id = new URLSearchParams(window.location.search).get("id")
let form = document.querySelector('form');
const idImg = document.querySelector(".id-img");
const file = document.querySelector('input[type="file"]');
let formImg = document.querySelector('.form-img');
let formName = document.querySelector('.form-name');

fetch(`http://localhost:3000/boxs/${id}`)
    .then(res => res.json())
    .then(data => {
        idImg.src = data.image;
        formName.value = data.name;
    })

file.addEventListener('input', (e) => {
    let file = e.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            idImg.src = reader.result;
        }
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:3000/boxs/${id}`, {
        image: idImg.src,
        name: formName.value
    })
        .then(res => {
            console.log(res.data);
        })
        window.location = "./index.html";
})