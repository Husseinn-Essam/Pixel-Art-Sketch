const container = document.querySelector(".container");
for (var i = 0; i < 256; i++) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    container.appendChild(pixel);
}
let pixels = document.querySelectorAll(".pixel");
console.log(pixels);
pixels.forEach(pixel => {

    pixel.addEventListener('mouseover', (e) => {
        if (e.buttons == 1 || e.buttons == 3) {
            pixel.setAttribute('style', 'background-color: black');
        }
    })
})
