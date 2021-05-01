var Cell = function(_x, _y) {
    let cell = {};
    cell.x = _x;
    cell.y = _y;
    cell.type = 0;
    return cell;
}

function getNewCellsArr(width, height) {
    let output = new Array()
    for (let y = 0; y < width; y++) {
        for (let x = 0; x < height; x++) {
            let cell = new Cell(x, y)
            if (x == 0 || x == width - 1 || y == 0 || y == height - 1) cell.type = 1
            if (((y == 0 || y == height - 1) && (x == 8 || x == 9)) || ((x == 0 || x == width - 1) && (y == 8 || y == 9))) 
                cell.type = 0
            output[output.length] = cell
        }
    }
    return output
}

var Field = function(_ctx, _xSize, _ySize, _cellSize, _colors) {
    let field = {};
    field.ctx = _ctx;
    field.cellSize = _cellSize;
    field.xSize = _xSize;
    field.ySize = _ySize;
    field.cellColors = _colors;
    field.cellArr = getNewCellsArr(field.xSize, field.ySize);

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
    drawRectangle(ctx, _x, _y, color, cellSize*0.15, cellSize*0.2);
}