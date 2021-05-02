var w = 800
var h = 600

var rnd = Math.random

var cellSize = 30;
var colorBackground = "rgba(0,190,55,0.1)"
var colorWall = "rgba(0,190,55,1)"
var colorSnake = "rgba(155,235,0,1)"
var colors = [colorBackground, colorWall, colorSnake]
var partArr = new Array()

var drawer = Drawer();
var field = new Field(drawer.bg, 18, 18, cellSize, colors);
var mainMenu = MainMenu(drawer.ui, "rgba(0,255,0,1)")

function clearForeground() {
    drawer.fg.clearRect(0,0,w,h)
}

function startGame() {
    userInGame = true

    drawer.ui.clearRect(0,0,w,h)
    field.clear()
    field.draw()
    snake.draw()
    apple.findPos()
    apple.draw()

    clearInterval(timer);
    timer = setInterval(timeTick, 500);
}

function timeTick() {
    if (userInGame) {
        snake.move()

        clearForeground()
        snake.draw()
        apple.draw()
    }
    else {
        mainMenu.draw();
    }
}

/////////////////////////////////////MainFunc////////////////////////////////////////
var snake = new Snake(drawer.fg ,field.xSize/2, field.ySize/2) 

drawer.bg.shadowBlur = 10
drawer.fg.shadowBlur = 12

var userInGame = false

mainMenu.draw()

let start = Date.now(); 
var sleepTime = 10;
var timer = setInterval(function() {

 // let timePassed = Date.now() - start;

//   if (timePassed >= 2000) {
//     clearInterval(timer); // закончить анимацию через 2 секунды
//     return;
//   }

    timeTick();

}, sleepTime);

let timer2 = setInterval(function() {
    drawer.drawParticles(partArr)
}, 20);

$('body').mouseup(function(e){
    if (userInGame) {
        if (e.which == 1) 
            if ((snake.head.dir+3)%4 != snake.bodyArr[0].dir)
                snake.head.dir = (snake.head.dir+1)%4
        if (e.which == 3) 
            if ((snake.head.dir+1)%4 != snake.bodyArr[0].dir)
                snake.head.dir = (snake.head.dir+3)%4
    }
    else {
        mainMenu.buttons.forEach(button => {
            if (button.isCollision(e.pageX, e.pageY))
                button.click();
        });
    };
});