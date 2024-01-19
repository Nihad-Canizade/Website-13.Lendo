let form = document.querySelector('form');
let formImg = document.querySelector('.form-img');
let formName = document.querySelector('.form-name');
let formPrice = document.querySelector('.form-price');
let table = document.querySelector('table');
let addBtn = document.getElementById("submit");
let idImg = document.querySelector('.id-img');

// See cloose file
formImg.addEventListener('input', (e) => {
    let file = e.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            idImg.src = reader.result;
        }
    }
})


// Form for add
addBtn.addEventListener("click", function () {
    if (formImg.value !== "" && formName.value !== "" && formPrice.value !== "") {
        axios.post(`http://localhost:3000/boxs`, {
            image: idImg.src,
            name: formName.value,
            price: formPrice.value,

        })
            .then(res => console.log(res.data));
        reader.readAsDataURL(src);
    }
    else {
        alert("Please fill in all fields.");
    }
})


// Get data Api
function getDataApi() {
    fetch('http://localhost:3000/boxs')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                table.innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.price}</td>
                <td><i class="bi bi-trash" onclick = "boxDelete(${element.id})"></i></td>
            </tr>`
            })
        })
}

getDataApi();


// Boxs delete function
function boxDelete(id) {
    axios.delete(`http://localhost:3000/boxs/${id}`)
    window.location.reload();
}