
let clr = document.querySelector("[type=color]");



function generateGrid(tileSize) {
    let cnv = document.querySelector(".canvas");
    while (cnv.firstChild) {
        cnv.removeChild(cnv.firstChild);
    }

    let cnv_size = getComputedStyle(cnv).inlineSize;
    let pixel_size = parseFloat(cnv_size)/tileSize;
    
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < tileSize; i++) {
        let row = document.createElement("div")
        row.style.display = "flex";

        for (let j = 0; j < tileSize; j++) {
            let tile = document.createElement("div");
            tile.style.height = pixel_size + "px";
            tile.style.width = pixel_size + "px";
            tile.classList.add("tile");

            tile.addEventListener("mouseover", e=>{
                if(mouseDown){
                    e.target.style.backgroundColor = clr.value;
                }
            })

            tile.addEventListener("click", e=>{
                e.target.style.backgroundColor = "#FFFFFF";

            })

            fragment.appendChild(tile);
        }
        row.appendChild(fragment);
        cnv.appendChild(row);
    }
    
}


let btn_canvas = document.querySelector("input[value=New]");

btn_canvas.addEventListener("click", () => {
    let size = parseInt(prompt());

    generateGrid(size)
});

let mouseDown = 0;
document.body.onmousedown = function() { 
    mouseDown = 1;
}
document.body.onmouseup = function() {
    mouseDown = 0;
}

