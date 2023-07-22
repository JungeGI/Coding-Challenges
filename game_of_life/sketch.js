const resolution = 5;
var cols;
var rows;

var grid;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for(let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    return arr;
}

function countNeighbors(grid, x, y) {
    let sum = 0;

    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            sum += grid[(x+i+cols) % cols][(y+j+rows) % rows]
        }
    }
    sum -= grid[x][y];

    return sum;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cols = floor(width / resolution);
    rows = floor(height / resolution);

    console.log(cols)
    console.log(rows)

    grid = make2DArray(cols, rows);

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(0, 2))
        }
    }

    noStroke();
}

function mouseDragged() {
    let x = mouseX;
    let y = mouseY;
    let gridX = floor(map(x, 0, width, 0, cols));
    let gridY = floor(map(y, 0, height, 0, rows));

    grid[gridX][gridY] = 1;
}
  
function draw() {
    
    let next = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j] == 0) {
                fill(255);
            } else {
                fill(0);
            }
            rect(i * resolution, j * resolution, resolution, resolution);

            let neighbors = countNeighbors(grid, i, j);
            let status = grid[i][j];
            if (status == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else {
                next[i][j] = 0;
            }

            if (status == 1) {
                if (neighbors < 2) {
                    next[i][j] = 0;
                }
                if (neighbors == 2 || neighbors == 3) {
                    next[i][j] = 1;
                }
                if (neighbors > 3) {
                    next[i][j] = 0;
                }
            } 
        }
    }

    grid = next;
    //console.log(grid);
    //noLoop();
}