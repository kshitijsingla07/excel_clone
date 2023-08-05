// To use this functionality in windows, change metaKey to ctrlKey

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");

let copyData = [];

let rangeStorage = [];
let metaKey = false;
document.addEventListener("keydown", (e) => {
    metaKey = e.metaKey;
})
document.addEventListener("keyup", (e) => {
    metaKey = e.metaKey;
})

for(let i=0; i<rows; i++) {
    for(let j=0; j<columns; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCell (cell);
    }
}

function handleSelectedCell(cell) {
    cell.addEventListener("click", (e) => {
        if(!metaKey)
            return;
        if(rangeStorage.length>=2) {
            defaultSelectedCellUI();
            rangeStorage = [];
        }
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        cell.style.border = "3px solid #218c74"
        rangeStorage.push([rid, cid]);
    })
}

function defaultSelectedCellUI() {
    for(let i=0; i<rangeStorage.length; i++) {
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid #dfe4ea";
    }
}

copyBtn.addEventListener("click", (e) => {
    if(rangeStorage.length<2) return;
    copyData = [];
    for(let i=rangeStorage[0][0]; i<=rangeStorage[1][0]; i++) {
        let copyRow = [];
        for(let j=rangeStorage[0][1]; j<=rangeStorage[1][1]; j++) {
            let cellProp = sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }
    defaultSelectedCellUI();
})

cutBtn.addEventListener("click", (e) => {
    if(rangeStorage.length<2) return;
    copyData = [];
    for(let i=rangeStorage[0][0]; i<=rangeStorage[1][0]; i++) {
        let copyRow = [];
        for(let j=rangeStorage[0][1]; j<=rangeStorage[1][1]; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            let cellProp = sheetDB[i][j];
            let cellObj = {...cellProp};
            copyRow.push(cellObj);
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = "14";
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.BGcolor = "#ecf0f1";
            cellProp.alignment = "left";
            cell.click();
        }
        copyData.push(copyRow);
    }
    console.log(copyData);
    defaultSelectedCellUI();
})

pasteBtn.addEventListener("click", (e) => {
    if(rangeStorage.length<2)
        return;
    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);
    let address = addressBar.value;
    let [strow, stcol] = decodeRIDCIDFromAddress(address);
    for(let i=strow; i<=strow+rowDiff; i++) {
        for(let j=stcol; j<=stcol+colDiff; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(!cell) continue;
            //DB change
            let cellProp = sheetDB[i][j];
            let data = copyData[i-strow][j-stcol];
            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontColor = data.fontColor;
            cellProp.BGcolor = data.BGcolor;
            cellProp.alignment = data.alignment;
            // UI change
            cell.click();
        }
    }
})