// Storage of cell properties
let collectedSheetDb = []; //Collection of all sheets
let sheetDB = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
}

// Select all properties
let formulaBar = document.querySelector(".formula-bar");
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";


// returns cell and its properties object using address from address bar
function activeCell(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

//returns rowID and colID using address from address bar
function decodeRIDCIDFromAddress(address) {
    // address -> "A1"
    let rowID = Number(address.slice(1))-1; //0
    let colID = Number(address.charCodeAt(0))-65;
    return [rowID, colID];
}

// Attach listeners to all properties
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
})

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
})

fontFamily.addEventListener("input", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontSize.addEventListener("input", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontColor.addEventListener("input", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

BGcolor.addEventListener("input", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})

alignment.forEach((align) => {
    align.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = activeCell(address);
        let alignValue = e.target.classList[1];
        cellProp.alignment = alignValue;
        cell.style.textAlign = cellProp.alignment;
        switch(alignValue) {
            case "left" :
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center" :
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right" :
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

// setting all options like bold, italics, etc correspoding to the cell properties
let allCells = document.querySelectorAll(".cell");
for(let i=0; i<allCells.length; i++)
    addListenerToAttachCellProperties(allCells[i]);
    
function addListenerToAttachCellProperties(cell) {
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        // setting values and properties on cells
        cell.innerText = cellProp.value;
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;
    
        // setting properties options to on for respective properties
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontFamily.value = cellProp.fontFamily;
        fontSize.value = cellProp.fontSize;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        switch(cellProp.alignment) {
            case "left" :
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center" :
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right" :
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
        formulaBar.value = cellProp.formula;
    })
}