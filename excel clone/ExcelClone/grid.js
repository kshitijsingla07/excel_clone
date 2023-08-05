let rows = 100;
let columns = 26; 

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

// Creating column numbering (A-Z)
for(let i=0; i<rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.innerText = i+1;
    addressCol.setAttribute("class", "address-col");
    addressColCont.appendChild(addressCol);
}

// Creating row numbering (1-100)
for(let i=0; i<columns; i++) {
    let addressRow = document.createElement("div");
    addressRow.innerText = String.fromCharCode(i+65);
    addressRow.setAttribute("class", "address-row");
    addressRowCont.appendChild(addressRow);
}

// Creating cells
for(let i=0; i<rows; i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for(let j=0; j<columns; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("spellcheck", "false")
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay (cell, i, j);
    }
    cellsCont.appendChild(rowCont);
}

// Display address of cells in address bar
function addListenerForAddressBarDisplay(cell, i, j) {
    cell.addEventListener("click", (e) => {
        let rowID = i+1;
        let colID = String.fromCharCode(j+65);
        addressBar.value = `${colID}${rowID}`;
    })
}