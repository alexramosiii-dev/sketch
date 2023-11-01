let color_selector = document.querySelector("input[type=color]");
let ncanvas_btn = document.querySelector("input[value=New]");
let gradual_btn = document.querySelector("input[value=Gradual]");
let colorful_btn = document.querySelector("input[value=Colorful]");
let isColorful = false;
let isGradual = false;

gradual_btn.addEventListener("click", e => {
    e.target.classList.toggle("activated");
    color_selector.value = "#000000";
    isGradual = !isGradual;

    isColorful = false;
    colorful_btn.classList.remove("activated");
}) 
colorful_btn.addEventListener("click", e => {
    e.target.classList.toggle("activated");
    isColorful = !isColorful;

    isGradual = false;
    gradual_btn.classList.remove("activated");
}) 
ncanvas_btn.addEventListener("click", () => 
addTilesEvents(generateGrid())
);

//tracks if a mouse button is press hold.
let mouseDown = 0;
document.body.onmousedown = e=> {
    if (e.button == 0) {
        mouseDown = 1;
    }else if (e.button == 2){
        mouseDown = 2;
    }
}
document.body.onmouseup = function() {
    mouseDown = 0;
}

//add diff events in each tiles.
color_selector.addEventListener("click",() => {
    if(isGradual){
        isGradual = false;
        gradual_btn.classList.remove("activated");
    }else if (isColorful){
        isColorful = false;
        colorful_btn.classList.remove("activated");
    }
})


function generateGrid() {
    let tileSize = parseInt(prompt());
    let cnv = document.querySelector(".canvas");
    let tiles = [];
    //clear canvas
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
            tile.style.backgroundColor = "white";
            tile.classList.add("tile");
            tile.draggable = false;

            fragment.appendChild(tile);
        }
        tiles = tiles.concat(Array.from(fragment.childNodes));

        row.appendChild(fragment);
        cnv.appendChild(row);
    }
    return tiles;
}

function paintGradual(e) {
    let tileColor = getComputedStyle(e.target).backgroundColor;
    console.log(typeof tileColor);
    
}

function paintColorful(e){
    let randomValue = () => (Math.floor(Math.random() * 255) + 1).toString(16);
    let r = randomValue();
    let g = randomValue();
    let b = randomValue();
    e.target.style.backgroundColor = "#"+r+g+b;
}

function addTilesEvents(tiles) {
    tiles.forEach(n => {
        n.addEventListener("mousedown", (e) => {
            if (e.button == 0 && isGradual){
                paintGradual(e);
            }else if (e.button == 0 && isColorful){
                paintColorful(e);
            }
            else if(e.button == 0) {
                e.target.style.backgroundColor = color_selector.value;
            }
            else if (e.button == 2){
                e.target.style.backgroundColor = "#FFFFFF";
            }
        });
    
        n.addEventListener("mouseover", e => {
            if (mouseDown == 1 && isGradual){
                paintGradual(e);
            }else if(mouseDown == 1 && isColorful) {
                paintColorful(e);
            }else if(mouseDown == 1) {
               e.target.style.backgroundColor = color_selector.value;
            }else if (mouseDown == 2) {
                e.target.style.backgroundColor = "#FFFFFF";
            }
        });
    
       

        //default preventers
        n.addEventListener("contextmenu", e=> {
            e.preventDefault();
        });
        n.addEventListener('dragstart', e => {
            e.preventDefault();
        });
        n.addEventListener('drop', e => {
            e.preventDefault();
        });
    })
}


