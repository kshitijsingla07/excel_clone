// traverse through each cell and save its data
for(let i=0; i<rows; i++) {
    for(let j=0; j<columns; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [currCell, cellProp] = activeCell(address);
            let enteredData = currCell.innerText;
            if(cellProp.value != enteredData) {
                cellProp.value = enteredData;
                removeChildFromParent(cellProp.formula);
                cellProp.formula = "";
                updateChildrenCells(address);
            }
        })
    }
}

// main function for addEventListener for formulaBar enter
formulaBar.addEventListener("keydown", async (e) => {
    let inputFormula = formulaBar.value;
    if (e.key == "Enter" && inputFormula) {
        let address = addressBar.value; 
        let [cell, cellProp] = activeCell(address);
        if(inputFormula !== cellProp.formula) {
            addChildToGraphComponent(inputFormula, address);
            let cycleResponse = isGraphCyclic(graphComponentMatrix);
            if(cycleResponse) {
                // Uncomment this to use cyclePathDetection
                let response = confirm("Your formula is Cyclic. Do you want to trace you path?");
                while(response) {
                    await isGraphCyclicTracePath(graphComponentMatrix, cycleResponse);
                    response = confirm("Your formula is Cyclic. Do you want to trace you path?");
                }
                alert("Your formula is cyclic.");
                removeChildToGraphComponent(inputFormula, address);
                return;
            }
            removeChildFromParent(cellProp.formula);
            addChildToParent(inputFormula);
            let evaluatedValue = evaluateFormula(inputFormula);
            setCellUIAndCellProp(evaluatedValue, inputFormula, address);
            updateChildrenCells(address);
        }
    }
})

// decode formula and get value
function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for(let i=0; i<encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90) {
            let [cell, cellProp] = activeCell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

// displays the formula and value in the active cell
function setCellUIAndCellProp (evaluatedValue, formula, address) {
    let [cell, cellProp] = activeCell(address);
    cell.innerText = evaluatedValue;
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}

// remove parent-child relation for old formula
function removeChildFromParent(formula) {
    let encodedFormula = formula.split(" "); 
    for(let i=0; i<encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90) {
            let [cell, cellProp] = activeCell(encodedFormula[i]);
            let idx = cellProp.children.indexOf(formulaBar.value);
            cellProp.children.splice(idx, 1);
        }
    }
}

// create parent-child relation for new formula
function addChildToParent(formula) {
    let encodedFormula = formula.split(" ");
    for(let i=0; i<encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90) {
            let [cell, cellProp] = activeCell(encodedFormula[i]);
            cellProp.children.push(addressBar.value);
        }
    }
}

// recursively change value of children cells when value of parent cell is changed
function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = activeCell(parentAddress);
    let children = parentCellProp.children;
    for(let i=0; i<children.length; i++) {
        let childAddress = children[i];
        let [childCell, childCellProp] = activeCell(childAddress);
        let childFormula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
        updateChildrenCells(childAddress);
    }
}

function addChildToGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i=0; i<encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].push([crid, ccid]);
        }
    }
}

function removeChildToGraphComponent(formula, childAddress) {
    let encodedFormula = formula.split(" ");
    for(let i=0; i<encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}