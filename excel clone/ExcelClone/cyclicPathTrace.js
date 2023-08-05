function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}

async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
    let [srcr, srcc] = cycleResponse;
    let visited = [];
    let dfsVisited = [];
    for(let i=0; i<rows; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j=0; j<columns; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow); 
    }
    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited);
    if(response)
        return Promise.resolve(true);
    return Promise.resolve(false);
}

async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;
    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor = "lightblue";
    await colorPromise();
    for(let children=0; children<graphComponentMatrix[srcr][srcc].length; children++) {
        let [crid, ccid] = graphComponentMatrix[srcr][srcc][children];
        if(!visited[crid][ccid]) {
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix, crid, ccid, visited, dfsVisited);
            if(response) {
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
            }
        }
        else if(visited[crid][ccid] && dfsVisited[crid][ccid]) {
            let cyclicCell = document.querySelector(`.cell[rid="${crid}"][cid="${ccid}"]`);
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();
            cyclicCell.style.backgroundColor = "transparent";
            await colorPromise();
            cell.style.backgroundColor = "transparent";
            await colorPromise();
            return Promise.resolve(true);
        }
    }
    dfsVisited[srcr][srcc] = false;
    cell.style.backgroundColor = "transparent";
    await colorPromise();
    return Promise.resolve(false);
}