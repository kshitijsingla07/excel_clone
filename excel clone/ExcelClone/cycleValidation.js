let collectedGraphComponent = [];
let graphComponentMatrix = [];

function isGraphCyclic(graphComponentMatrix) {
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
    for(let i=0; i<rows; i++) {
        for(let j=0; j<columns; j++) {
            if(!visited[i][j]) {
                let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
                if(response)
                    return [i, j];
            }
        }
    }
    return null;
}

// When we come to new node -> visited[node] = true, dfsVisisted[node] = true
// When we go back while dfs retraction -> dfsVisited[node] = false
//  If visted[node]===true, go back as already discovered
// Final checking condition -> if we come again at any node and visited[node]===true && dfsVisited[node]===true, cycle detected
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;
    for(let children=0; children<graphComponentMatrix[srcr][srcc].length; children++) {
        let [crid, ccid] = graphComponentMatrix[srcr][srcc][children];
        if(!visited[crid][ccid]) {
            let response = dfsCycleDetection(graphComponentMatrix, crid, ccid, visited, dfsVisited);
            if(response) //Found cycle
                return true;
        }
        else if(visited[crid][ccid] && dfsVisited[crid][ccid])
            return true;
    }
    dfsVisited[srcr][srcc] = false;
    return false; //No cycle detected
}