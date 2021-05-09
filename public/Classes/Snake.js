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
        drawer.drawCell(snake.ctx ,snake.head.x, snake.head.y, colorSnake, cellSize*0.25, cellSize*0.2)
    }

    snake.drawBody = () => {
        snake.bodyArr.forEach(point => {
            drawer.drawCell(snake.ctx ,point.x, point.y, colorSnake, cellSize*0.35, cellSize*0.2)
        });
    }

    snake.move = () => {
        let _x = (snake.head.x+field.xSize-(snake.head.dir-1)%2)%field.xSize
        let _y = (snake.head.y+field.ySize+(snake.head.dir-2)%2)%field.ySize
        let cell = field.getCellXY(_x, _y)
        if (cell != undefined)
            if (!snake.IsThere(_x, _y))
            {
                if (cell.type != 1) {
                    snake.bodyArr.unshift(new BodyCell(snake.head.x, snake.head.y, snake.head.dir));
                    if (cell.type == 3) {
                        let portal;
                        portalArr.forEach(el => {
                            if (_x == el.x && _y == el.y) {
                                portal = el;
                            }
                        });
                        _x = (portal.linkedPortal.x+field.xSize-(snake.head.dir-1)%2)%field.xSize
                        _y = (portal.linkedPortal.y+field.ySize+(snake.head.dir-2)%2)%field.ySize
                    }
                    snake.head.x = _x;
                    snake.head.y = _y;
                    snake.bodyArr.pop();
                    for (let i = 0; i < appleArr.length; i++) {
                        let apple = appleArr[i];
                        if (apple.x == snake.head.x && apple.y == snake.head.y) {
                            apple.eatenUp();
                        }
                    }
                } else {
                    gameEndActions();
                }
            } else {
                gameEndActions();
            }
    }

    snake.IsThere = (_x, _y) => {
        if (_x == snake.head.x && _y == snake.head.y) return true;
        for(let i = 0; i < snake.bodyArr.length - 1; i++) {
            if (_x == snake.bodyArr[i].x && _y == snake.bodyArr[i].y) return true;
        }
        return false;
    }

    snake.tryTurnLeft = () => {
        if ((snake.head.dir+3)%4 != snake.bodyArr[0].dir)
                snake.head.dir = (snake.head.dir+1)%4;
    }

    snake.tryTurnRight = () => {
        if ((snake.head.dir+1)%4 != snake.bodyArr[0].dir)
                snake.head.dir = (snake.head.dir+3)%4;
    }

    snake.increaseSize = () => {
        snake.bodyArr.unshift(new BodyCell(snake.head.x, snake.head.y, snake.head.dir));
    }

    snake.reduceSize = () => {
        snake.bodyArr.pop();
    }

    return snake
}

var BodyCell = function(_x, _y, _dir) {
    return {x: _x, y: _y, dir: _dir}
}

