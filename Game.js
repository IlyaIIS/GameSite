var w = 600
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
    snake = new Snake(drawer.fg ,field.xSize/2, field.ySize/2);
    user = new User();

    gameWindow = 1;

    drawer.ui.clearRect(0,0,w,h)
    clearForeground()
    field.clear()
    field.draw()
    snake.draw()
    apple.findPos()
    apple.draw()

    let speed = 350 - (mainMenu.buttons[1].content*50)
    clearInterval(timer);
    timer = setInterval(timeTick, speed);

    user.scoreMode = 1+(mainMenu.buttons[1].content-3)/4;
}

function timeTick() {
    if (gameWindow == 1) {
        snake.move();

        clearForeground();
        snake.draw();
        apple.draw();
        drawer.drawUi();
    }
    else {
        mainMenu.draw();
    }
}

function gameEndActions() {
    drawer.showPopWindow("ВАШ СЧЁТ: " + user.score.toString(), goBackToMainMenu);
    clearInterval(timer);
    //отправка результатов на сервер
}
function goBackToMainMenu() {
    gameWindow = 0;
    mainMenu.draw();
    timer = setInterval(timeTick, 10)
}

/////////////////////////////////////MainFunc////////////////////////////////////////
var snake,user;

var gameWindow = 0;

drawer.bg.shadowBlur = 10
drawer.fg.shadowBlur = 12
drawer.ui.shadowBlur = 3;

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
    if (gameWindow == 1) {
        if (drawer.popWindows.length > 0) {
            drawer.popWindows.forEach(window => {
                if (window.isCollision(e.pageX, e.pageY))
                    window.click();
            })
        }
        else {
            if (e.which == 1) 
                if ((snake.head.dir+3)%4 != snake.bodyArr[0].dir)
                    snake.head.dir = (snake.head.dir+1)%4
            if (e.which == 3) 
                if ((snake.head.dir+1)%4 != snake.bodyArr[0].dir)
                    snake.head.dir = (snake.head.dir+3)%4
        }
    }
    else {
        mainMenu.buttons.forEach(button => {
            if (button.isCollision(e.pageX, e.pageY))
                button.click();
        });
    };
});