class Apple {
    x;
    y;
    color = "rgb(255,0,0)";

    constructor() {
        this.findPos();
    }

    findPos() {
        let _x, _y
        do {
            _x = Math.round(rnd()*(field.xSize-1))
            _y = Math.round(rnd()*(field.ySize-1))
        }while(field.getCellXY(_x, _y).type == 1 || snake.IsThere(_x, _y) || appleIsThere(_x, _y))
        this.x = _x
        this.y = _y
    }

    draw() {
        drawer.drawCell(drawer.fg, this.x, this.y, this.color, cellSize*0.25, cellSize*0.1, cellSize/4 )
    }

    eatenUp() {
        snake.increaseSize();
        user.addScore();
        createParticles(snake.head.x, snake.head.y, 5, this.color);
        this.findPos();
        if (snake.bodyArr.length >= 10 && rnd() <= 0.1) 
            appleArr.push(new AntiApple());
        if (rnd() <= 0.1) 
            appleArr.push(new SlowApple());

        if (isSlow) {
            isSlow = false;
            let speed = 350 - (mainMenu.buttons[1].content*50);
            clearInterval(timer);
            timer = setInterval(timeTick, speed);
        }
    }
}

class AntiApple extends Apple {
    color = "rgb(255,255,0)";

    eatenUp() {
        snake.reduceSize();
        user.addScore();
        createParticles(snake.head.x, snake.head.y, 5, this.color);
        appleArr.splice(appleArr.indexOf(this),1);
    }
}

class SlowApple extends Apple {
    color = "rgb(0,0,255)";

    eatenUp() {
        user.addScore();
        createParticles(snake.head.x, snake.head.y, 5, this.color);
        appleArr.splice(appleArr.indexOf(this),1);

        isSlow = true;
        let speed = 350 - (mainMenu.buttons[1].content*50);
        clearInterval(timer);
        timer = setInterval(timeTick, speed*1.5);
    }
}

function appleIsThere(x, y) {
    appleArr.forEach(apple => {
        if (apple.x == x && apple.y == y) {
            return true;
        }
    });
    return false;
}