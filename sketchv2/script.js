let cnv = document.querySelector("#canvas");
let label = document.querySelector("#sizeLabel");
let newc = document.querySelector("#new");
let clear = document.querySelector("#clear");
let shade = document.querySelector("#shade");
let colorful = document.querySelector("#colorful");

//detects mouse hold and disable drag
let mouseDown = -1;
document.addEventListener("mousedown", e=>mouseDown = e.button);
document.addEventListener("mouseup", () => mouseDown = -1);
document.addEventListener("dragstart", e => e.preventDefault());

//event listeners for buttons
clear.addEventListener("click", e=> document.querySelectorAll(".tile").forEach(n=>n.style.backgroundColor = "rgb(255,255,255)"));
newc.addEventListener("click", e=> generateGrid(parseInt(prompt())));
shade.addEventListener("click", e=> e.target.classList.toggle("activated"));
colorful.addEventListener("click", e=> e.target.classList.toggle("activated"));

//initial start
document.addEventListener("DOMContentLoaded", ()=> generateGrid(16))


//functions that do something
function addListeners(tile){
    //rightbutton erase
    tile.addEventListener("contextmenu", e=>e.preventDefault());
    
    //leftbutton 
    tile.addEventListener("mousedown", e=>{
        if(!e.button) {
            paint(e);
        }else if (e.button == 2){
            e.target.removeAttribute("style");
        }
    })

    tile.addEventListener("mouseenter", e=> {
        if(!mouseDown) {
            paint(e); 
        }else if (mouseDown == 2){
            e.target.removeAttribute("style");
        }
    })
}

function paint(e){
    if(shade.classList.contains("activated")){
        let cvalue = e.target.style.backgroundColor.split(',');
        let r = parseInt(cvalue[0].split("(")[1]);
        let g = parseInt(cvalue[1]);
        let b = parseInt(cvalue[2]);
        let increment = Math.floor(255/10);
        e.target.style.backgroundColor = `rgb(${r - increment},${g - increment},${b - increment})`
    }else if(colorful.classList.contains("activated")) {
        let c = () => (Math.floor(Math.random() * 255) + 1);
        e.target.style.backgroundColor = `rgb(${c()},${c()},${c()})`
    }else {
        e.target.style.backgroundColor ="rgb(0,0,0)";
    }
}

function clearGrid(){
    cnv.innerHTML = "";
}

function generateGrid(gridSize) {
    if(!gridSize) {
        return;
    }
    label.textContent = gridSize + "x" + gridSize;    
    clearGrid();
    let frag = new DocumentFragment();
    for (let i = 0; i < gridSize; i++) {        
        let frag2 = new DocumentFragment();
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < gridSize; j++) {
            let tile = document.createElement("div");
            tile.classList.add("tile")
            tile.style.backgroundColor = "rgb(255,255,255)";
            addListeners(tile);
            frag2.append(tile);
        }
        row.append(frag2)
        frag.append(row);
    }
    cnv.append(frag);
}

