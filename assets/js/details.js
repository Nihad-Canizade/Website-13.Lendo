let id = new URLSearchParams(window.location.search).get("id");
let sec2Boxs = document.querySelector('.sec2-boxs');


fetch(`http://localhost:3000/boxs/${id}`)
    .then(res => res.json())
    .then(data => {
        sec2Boxs.innerHTML += `
        <div class="sec2-box">
        <img src="${data.image}" alt="Image">
        <p class="sec2-box-p1">${data.name}</p>
    </div>
    `
    });