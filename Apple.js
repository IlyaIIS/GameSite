var apple = {}
{
    apple.x
    apple.y
    apple.findPos = () => {
        let _x, _y
        do {
            _x = Math.round(rnd()*(field.xSize-1))
            _y = Math.round(rnd()*(field.ySize-1))
        }while(field.getCellXY(_x, _y).type == 1 || snake.IsThere(_x, _y))
        apple.x = _x
        apple.y = _y
    }
    apple.draw = () => {
        drawRectangle(drawer.fg, apple.x, apple.y, "red", cellSize*0.25, cellSize*0.1, cellSize/4 )
    }
}