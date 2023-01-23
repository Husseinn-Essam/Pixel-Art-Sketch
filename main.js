//generate random color for RGB
function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}
//create sketchs
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
    sizeId();
}
function sizeId() {
    label.textContent = `${size}X${size}`
}
//reset sketch when size is changed
function resetSketch() {
    var divs = document.querySelectorAll(".pixel");
    for (var i = 0; i < divs.length; i++) {
        container.removeChild(divs[i]);
    }
}

//change button color when selected
function chgBtnColor() {
    const btns = document.querySelectorAll("button");
    for (var i = 0; i < btns.length; i++) {
        if (btns[i] == selected) {
            btns[i].style.backgroundColor = "#2C3333";
            btns[i].style.color = "#E7F6F2";
        } else {
            btns[i].style.backgroundColor = "#E7F6F2";
            btns[i].style.color = "#2C3333";
        }
    }
}


//Drawing function
function draw() {
    let pixels = document.querySelectorAll(".pixel");
    const color = document.getElementById("colorPick");
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', (e) => {

            if (isErasing == true) {
                pixel.style.backgroundColor = "white";
            } else if (rgb == true) {
                pixel.style.backgroundColor = generateRandomColor();
            }
            else if (rgb == false && isErasing == false) {
                pixel.style.backgroundColor = color.value;
            }
        }
        )
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
    selected = colorMode;
    chgBtnColor()
}

//Declarations and modes
const container = document.querySelector(".container");
const eraser = document.querySelector(".btn3");
const colorMode = document.querySelector(".btn1");
const rgbMode = document.querySelector(".btn2");
const clear = document.querySelector(".btn4");
const label = document.getElementById("sizeId");
var range = document.querySelector(".sketchSize");
var size = range.value;


let isErasing = false;
let rgb = false;
let clearAll = false;

eraser.addEventListener('click', () => {
    isErasing = true;
    rgb = false;
    selected = eraser;
    chgBtnColor();
})
colorMode.addEventListener('click', () => {
    isErasing = false;
    rgb = false;
    selected = colorMode;
    chgBtnColor();
})
rgbMode.addEventListener("click", () => {
    isErasing = false;
    rgb = true;
    selected = rgbMode;
    chgBtnColor();
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
