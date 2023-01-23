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
var range = document.querySelector(".sketchSize");
var size = range.value;
// for (var i = 0; i < size * size; i++) {
//     let pixel = document.createElement("div");
//     pixel.classList.add("pixel");
//     pixel.style.width = 500 / size + "px"
//     pixel.style.height = 500 / size + "px"
//     container.appendChild(pixel);
// }
var oldsize = size;



//container.style.gridTemplateColumns = `repeat(${size},1fr)`;
//container.style.gridTemplateRows = `repeat(${size},1fr)`;
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
range.addEventListener("mouseup", () => {
    var divs = document.querySelectorAll(".pixel");
    for (var i = 0; i < divs.length; i++) {
        container.removeChild(divs[i]);
    }
    size = range.value;

    for (var i = 0; i < size * size; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.width = 500 / size + "px"
        pixel.style.height = 500 / size + "px"
        container.appendChild(pixel);
    }
    container.style.gridTemplateColumns = `repeat(${size},1fr)`;
    container.style.gridTemplateRows = `repeat(${size},1fr)`;
    let pixels = document.querySelectorAll(".pixel");
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
})
