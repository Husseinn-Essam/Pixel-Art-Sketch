function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}

const container = document.querySelector(".container");
const eraser = document.querySelector(".btn3");
const colorMode = document.querySelector(".btn1");
const rgbMode = document.querySelector(".btn2");
const clear = document.querySelector(".btn4");
for (var i = 0; i < 256; i++) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    container.appendChild(pixel);
}
let isErasing = false;
let rgb = false;
let clearAll = false;
eraser.addEventListener('click', () => {
    isErasing = true;
    rgb = false;
})
colorMode.addEventListener('click', () => {
    isErasing = false;
    rgb = false;
})
rgbMode.addEventListener("click", () => {
    isErasing = false;
    rgb = true;
})

const color = document.getElementById("colorPick");



let pixels = document.querySelectorAll(".pixel");
clear.addEventListener('click', () => {
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = "white";
    })
})
pixels.forEach(pixel => {

    pixel.addEventListener('mouseover', (e) => {
        if (e.buttons == 1 || e.buttons == 3) {
            if (isErasing == true) {
                pixel.style.backgroundColor = "white";
            } else if (rgb == true) {
                pixel.style.backgroundColor = generateRandomColor();
            }
            else if (rgb == false && isErasing == false) {
                pixel.style.backgroundColor = color.value;
            }
        }
    })
})
