var Snake = function(_ctx, _x, _y) {
    let snake = {}
    snake.ctx = _ctx;
    snake.bodyArr = [new BodyCell(_x, _y, 1), new BodyCell(_x, _y+1, 1)]
    snake.head = new BodyCell(_x, _y-1, 1)
    snake.length = 3

    snake.draw = () => {
        snake.drawHead()
        snake.drawBody()
    }

    snake.drawHead = () => {
        drawRectangle(snake.ctx ,snake.head.x, snake.head.y, colorSnake, cellSize*0.25, cellSize*0.2)
    }

    snake.drawBody = () => {
        snake.bodyArr.forEach(point => {
            drawRectangle(snake.ctx ,point.x, point.y, colorSnake, cellSize*0.35, cellSize*0.2)
        });
    }

    snake.move = () => {
        let _x = (snake.head.x+field.xSize-(snake.head.dir-1)%2)%field.xSize
        let _y = (snake.head.y+field.ySize+(snake.head.dir-2)%2)%field.ySize
        let cell = field.getCellXY(_x, _y)
        if (cell != undefined)
            if ((cell.type != 1) && (!snake.IsThere(_x, _y))) {
                snake.bodyArr.unshift(new BodyCell(snake.head.x, snake.head.y, snake.head.dir))
                snake.head.x = _x
                snake.head.y = _y
                snake.bodyArr.pop()
                if (apple.x == snake.head.x && apple.y == snake.head.y) {
                    apple.findPos()
                    snake.bodyArr.unshift(new BodyCell(snake.head.x, snake.head.y, snake.head.dir))
                    for (let i = 0; i < 6; i++) {
                        let _x = snake.head.x*cellSize+cellSize*1.5+(rnd()*2-1)*cellSize*0.1
                        let _y = snake.head.y*cellSize+cellSize*1.5+(rnd()*2-1)*cellSize*0.1
                        partArr[partArr.length] = new Particle(drawer.pr, _x, _y, rnd()*360)
                    }
                    
                }
            }else {
                //dead
            }
    }

    snake.IsThere = (_x, _y) => {
        if (_x == snake.head.x && _y == snake.head.y) return true
        for(let i = 0; i < snake.bodyArr.length - 1; i++) {
            if (_x == snake.bodyArr[i].x && _y == snake.bodyArr[i].y) return true
        }
        return false
    }

    return snake
}

var BodyCell = function(_x, _y, _dir) {
    return {x: _x, y: _y, dir: _dir}
}