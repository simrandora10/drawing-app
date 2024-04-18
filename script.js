const canvas = 
    document.querySelector("canvas"),
toolBtns = 
    document.querySelectorAll(".tool"),
fillColor = 
    document.querySelector("#fill-color"),
sizeSlider = 
    document.querySelector("#size-slider"),
colorBtns = 
    document.querySelectorAll(".colors .option"),
colorPicker = 
    document.querySelector("#color-picker"),
cleatCanvas = 
    document.querySelector(".clear-canvas"),
saveImage = 
    document.querySelector(".save-img"),
ctx = canvas.getContext("2d");

const colorPicker2 = document.querySelector("#color-picker2");

//global variabels wiht default values
let prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5,
    selectedColor = "#000";

const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load", () => {
    
    // Setting canvas widht/height.. 
    // offsetwidht/height returns 
    // viewbale widht/height of an element
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});







const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; 
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width,
    canvas.height);
}


const drawPencil = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

const eraser_button= document.getElementById('eraser');

eraser_button.addEventListener('click', ()=>{
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 10;
    selectedColor = "#fff";
})



const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if (selectedTool === "brush" && selectedTool === "pencil" 
    || selectedTool === "eraser") {

        ctx.strokeStyle = selectedTool === "eraser" 
        ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (selectedTool === "rectangle") {
        drawRect(e);

    }
    else if (selectedTool === "circle") {
        drawCircle(e);

    } else if (selectedTool === "triangle") {
        drawTriangle(e);

    } else if (selectedTool === "square") {
        drawSquare(e);
    } else if (selectedTool === "hexagon") {
        drawHexagon(e);
    } else if (selectedTool === "pentagon") {
        drawPentagon(e);
    } else if (selectedTool === "line") {
        drawLine(e);
    } else if (selectedTool === "arrow") {
        drawArrow(e);
    } else if (selectedTool === "curve") {
        drawCurve(e);
    }
    else {
        drawPencil(e);

    }
}


toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active")
        .classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);

    });

});

sizeSlider.addEventListener("change", () => 
    brushWidth = sizeSlider.value)

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected")
        .classList.remove("selected");
        btn.classList.add("selected"); 
        selectedColor = window.getComputedStyle(btn)
        .getPropertyValue("background-color");
    });
});


colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = 
    colorPicker.value;
    colorPicker.parentElement.click();
});

colorPicker2.addEventListener('change', ()=>{
    colorPicker2.parentElement.style.background = colorPicker2.value;
    colorPicker2.parentElement.click();
    selectedColor = colorPicker2.value;
})

cleatCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setCanvasBackground();

})

saveImage.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}`.jpg;
    link.href = canvas.toDataURL();
    link.click();
})

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);
