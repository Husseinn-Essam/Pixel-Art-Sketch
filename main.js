//generate random color for RGB
function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}
//create sketch
function sketch(size) {
    for (var i = 0; i < size * size; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.width = 500 / size + "px"
        pixel.style.height = 500 / size + "px"
        container.appendChild(pixel);
    }
    container.style.gridTemplateColumns = `repeat(${size},1fr)`;
    container.style.gridTemplateRows = `repeat(${size},1fr)`;
}
//reset sketch when size is changed
function resetSketch() {
    var divs = document.querySelectorAll(".pixel");
    for (var i = 0; i < divs.length; i++) {
        container.removeChild(divs[i]);
    }
}
//Drawing function
function draw() {
    let pixels = document.querySelectorAll(".pixel");
    const color = document.getElementById("colorPick");
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
    clearSketch(pixels);
}

//Clear button
function clearSketch(pixels) {
    clear.addEventListener('click', () => {

        pixels.forEach(pixel => {
            pixel.style.backgroundColor = "white";
        })
    })

}

//Default sketch
function onStart(size) {
    sketch(size);
    draw();
}

//Declarations and modes
const container = document.querySelector(".container");
const eraser = document.querySelector(".btn3");
const colorMode = document.querySelector(".btn1");
const rgbMode = document.querySelector(".btn2");
const clear = document.querySelector(".btn4");
var range = document.querySelector(".sketchSize");
var size = range.value;


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




//Builds default sketch
onStart(size);

//on mouseup event builds sketch with the new size
range.addEventListener("mouseup", () => {
    resetSketch();
    size = range.value;//updated size after range input
    sketch(size);
    draw();
    clearSketch();
})
