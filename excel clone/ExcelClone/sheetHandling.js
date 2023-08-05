let sheetsFolderCont = document.querySelector(".sheets-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon");

addSheetBtn.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length);
    sheet.innerHTML = `<div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>`;
    sheetsFolderCont.appendChild(sheet);
    sheet.scrollIntoView();
    createSheetDB();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})

function createSheetDB() {
    let sheetDB = [];
    for (let i = 0; i < rows; i++) {
        let sheetRow = [];
        for (let j = 0; j < columns; j++) {
            let cellPropObj = {
                fontFamily: "monospace",
                fontSize: "14",
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontColor: "#000000",
                BGcolor: "#ecf0f1",
                value: "",
                formula: "",
                children: []
            };
            sheetRow.push(cellPropObj);
        }
        sheetDB.push(sheetRow);
    }
    collectedSheetDb.push(sheetDB);
}

function createGraphComponentMatrix() {
    let graphComponentMatrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push([]);
        }
        graphComponentMatrix.push(row);
    }
    collectedGraphComponent.push(graphComponentMatrix);
}

function handleSheetDB(sheetIdx) {
    sheetDB = collectedSheetDb[sheetIdx];
    graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handleSheetProperties() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    // Click 1st cell by default
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}

function handleSheetUi(sheet) {
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    allSheetFolders.forEach((s) => {
        s.style.backgroundColor = "transparent";
    })
    sheet.style.backgroundColor = "#ced6e0"
}

function handleSheetActiveness(sheet) {
    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUi(sheet);
    })
}

function handleSheetRemovalUi(sheet) {
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0; i<allSheetFolders.length; i++) {
        allSheetFolders[i].setAttribute("id", i);
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.innerText = `Sheet ${i+1}`;
    }
}

function handleSheetRemoval(sheet) {
    sheet.addEventListener("dblclick", (e) => {
        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length==1) {
            alert("You need to have atleaast one sheet.")
            return;
        }
        let response = confirm("Your sheet will be removed permanently. Do you want to delete it?");
        if(response) {
            let sheetIdx = Number(sheet.getAttribute("id"));
            collectedSheetDb.splice(sheetIdx, 1);
            collectedGraphComponent.splice(sheetIdx, 1);
            handleSheetRemovalUi(sheet);
            let allSheetFolders = document.querySelectorAll(".sheet-folder");
            allSheetFolders[0].click();
        }
    })
}