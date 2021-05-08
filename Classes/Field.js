var Cell = function(_x, _y) {
    let cell = {};
    cell.x = _x;
    cell.y = _y;
    cell.type = 0;
    return cell;
}

function getNewCellsArr(width, height, difficulty) {
    let output = new Array()
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let cell = new Cell(x, y)
            output[output.length] = cell

            switch (difficulty) {
                case 2:
                    if ( ((x >= 0 && x <= width /4.5) || (x >= (width /4.5)*3 && x <= width - 1)) && 
                         ((y >= 0 && y <= height/4.5) || (y >= (height/4.5)*3 && y <= height - 1)) )
                            cell.type = 1;
                    break;
                case 3:
                    if (x == 0 || x == width - 1 || y == 0 || y == height - 1) 
                        cell.type = 1;
                    if (((y == 0 || y == height - 1) && (x == 8 || x == 9)) || ((x == 0 || x == width - 1) && (y == 8 || y == 9))) 
                        cell.type = 0;
                    break;
                case 4:
                    if (x == 0 || x == width - 1 || y == 0 || y == height - 1) 
                        cell.type = 1;
                    break;
                case 5:
                    if (x == 0 || x == width - 1 || y == 0 || y == height - 1) 
                        cell.type = 1;
                    break;
                default:
                    break;
            }
        }
    }
    return output
}

function addRndBlocks(width, height, cellArr) {
    let rndCellNum = 0;
    for (let i = 0; i < cellArr.length; i++) {
        cell = cellArr[Math.floor(rnd()*cellArr.length)]
        
        if (rnd() <= 0.05+(10-rndCellNum)/10) {
            rndCellNum++;
            cell.type = 1;
        }

        if (cell.x == width/2 && cell.y > 0 && cell.y < height/2 + 2)
        cell.type = 0;
    }
    
}

function removeDeadlocks(width, cellArr) {
    for (let j = 0; j < 5; j++) {
        for (let i = width; i < cellArr.length - width; i++) {
            let blockNum = 0;
    
            if (cellArr[i+1].type == 1) blockNum++;
            if (cellArr[i-width].type == 1) blockNum++;
            if (cellArr[i-1].type == 1) blockNum++;
            if (cellArr[i+width].type == 1) blockNum++;
            
            if (blockNum >= 3) cellArr[i].type = 1;
        }
    }
}

var Field = function(_ctx, _xSize, _ySize, _cellSize, _colors, difficulty) {
    let field = {};
    field.ctx = _ctx;
    field.cellSize = _cellSize;
    field.xSize = _xSize;
    field.ySize = _ySize;
    field.cellColors = _colors;
    field.difficulty = difficulty;

    field.cellArr = getNewCellsArr(field.xSize, field.ySize, difficulty);
    
    if (field.difficulty == 5) {
        addRndBlocks(field.xSize, field.ySize, field.cellArr);
        removeDeadlocks(field.xSize, field.cellArr);
    }
    

    field.getCellXY = (_x, _y) => field.cellArr[_y*field.xSize + _x];

    field.draw = () => {
        field.cellArr.forEach(cell => {
            drawWall(field.ctx, cell.x, cell.y, field.cellColors[cell.type]);
        });
    }

    field.clear = () => {
        field.ctx.fillStyle = 'black';
        field.ctx.fillRect(0, 0, (field.xSize+2)*field.cellSize, (field.ySize+2)*field.cellSize);
    }

    return field
}

function drawWall(ctx, _x, _y, color) {
    drawer.drawCell(ctx, _x, _y, color, cellSize*0.15, cellSize*0.2);
}