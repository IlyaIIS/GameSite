class Portal {
    x;
    y;
    color = "blue";
    linkedPortal;

    constructor() {
        this.findPos(field);
    }

    findPos(field) {
        let cellArr = field.cellArr;
        let cell;
        do {
            cell = cellArr[Math.floor(rnd()*cellArr.length)]
        }while( (cell.type == 1) || 
                (cell.x == 0 || cell.x == field.xSize-1 || cell.y == 0 || cell.y == field.ySize-1) || 
                (field.getCellXY(cell.x+1, cell.y).type == 1 ||
                 field.getCellXY(cell.x, cell.y-1).type == 1 ||
                 field.getCellXY(cell.x-1, cell.y).type == 1 ||
                 field.getCellXY(cell.x, cell.y+1).type == 1 )
              )
        this.x = cell.x;
        this.y = cell.y;
        cell.type = 3;
    }

    link(portal) {
        this.linkedPortal = portal;
        portal.linkedPortal = this;
    }

    draw() {
        drawer.drawCell(drawer.fg, this.x, this.y, this.color, cellSize*0.25, cellSize*0.1);
    }
}

//Эта фигня не работает. Я не знаю почему, просто js так решил.
findPortal = function(_x, _y, output) {
    portalArr.forEach(portal => {
        if (_x == portal.x && _y == portal.y) {
            output = portal;
            return;
        }
    });
    
    throw "Портал с заданными координатами не найден";
}
