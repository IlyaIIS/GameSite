var w = 600
var h = 600

var rnd = Math.random

var cellSize = 30;
var colorBackground = "rgba(0,190,55,0.1)"
var colorWall = "rgba(0,190,55,1)"
var colorSnake = "rgb(155,235,0)"
var colorPortal = "rgba(0,0,255,1)"
var colors = [colorBackground, colorWall, colorSnake, colorPortal]
var partArr = new Array()
var appleArr = new Array();
var portalArr = new Array();

var drawer = Drawer();
var mainMenu = MainMenu(drawer.ui, "rgba(0,255,0,1)")

function clearForeground() {
    drawer.fg.clearRect(0,0,w,h)
}

function startGame() {
    field = new Field(drawer.bg, 18, 18, cellSize, colors, mainMenu.buttons[2].content);
    snake = new Snake(drawer.fg ,field.xSize/2, field.ySize/2);
    user = new User();

    appleArr = new Array();
    appleArr.push(new Apple());

    portalArr = new Array();
    portalArr.push(new Portal());
    portalArr.push(new Portal());
    portalArr[0].link(portalArr[1]);

    gameWindow = 1;

    drawer.ui.clearRect(0,0,w,h)
    clearForeground()
    field.clear()
    field.draw()
    snake.draw()
    appleArr[0].draw()

    let speed = 350 - (mainMenu.buttons[1].content*50);
    clearInterval(timer);
    timer = setInterval(timeTick, speed);

    user.scoreMode = 1 + (mainMenu.buttons[1].content-3)/4 + (mainMenu.buttons[2].content-3)/4;

    drawer.buttons.push(new Button(drawer.ui, "x", w-cellSize+3, 3, "rgba(0,255,0,1)", true, 0, 0, gameEndActions));
}

function timeTick() {
    if (gameWindow == 1) {
        snake.move();

        clearForeground();
        snake.draw();
        appleArr.forEach(apple => {
            apple.draw();
        });
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

    let temp = document.getElementById('score');
    temp.value = user.score;

    Url = `http://localhost:3000/score`;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', Url);
    xhr.setRequestHeader("Content-Type", "application/json");
    let test = JSON.stringify({
      score: user.score
    });

    xhr.send(test);


}

function goBackToMainMenu() {
    gameWindow = 0;
    drawer.buttons = [];
    mainMenu.draw();
    timer = setInterval(timeTick, 10)
}

/////////////////////////////////////MainFunc////////////////////////////////////////
var field,snake,user;

var gameWindow = 0;

drawer.bg.shadowBlur = 10
drawer.fg.shadowBlur = 12
drawer.ui.shadowBlur = 3;

mainMenu.draw()

var startTime = Date.now();
var isAlarm = false;
var isSlow = false;
var sleepTime = 10;
var timer = setInterval(function() {
    // if (isAlarm) {
    //     if (Date.now() - startTime >= 4000) {
    //         isAlarm = false;
    //         let speed = 350 - (mainMenu.buttons[1].content*50);
    //         clearInterval(timer);
    //         timer = setInterval(timeTick, speed);
    //         return;
    //     }
    // }

    timeTick();

}, sleepTime);

let timer2 = setInterval(function() {
    drawer.drawParticles(partArr)
}, 20);

$('body').mouseup(function(e){

    var rect = document.getElementById('game').getBoundingClientRect();

    if (gameWindow == 1) {
        if (drawer.popWindows.length > 0) {
            drawer.popWindows.forEach(window => {
                if (window.isCollision(e.pageX - rect.left, e.pageY - rect.top))
                    window.click();
            })
        }
        else {
            drawer.buttons.forEach(button => {
                if (button.isCollision(e.pageX - rect.left - window.scrollX, e.pageY - rect.top - window.scrollY))
                    button.click();
            });

            if (e.which == 1)
                snake.tryTurnLeft();
            if (e.which == 3)
                snake.tryTurnRight();
        }
    }
    else {
        mainMenu.buttons.forEach(button => {
            if (button.isCollision(e.pageX - rect.left - window.scrollX, e.pageY - rect.top - window.scrollY))
                button.click();
        });
    };
});

document.addEventListener('keyup', function(e){
    if (gameWindow == 1) {
        if (e.code == "KeyA" || e.code == "ArrowLeft")
            snake.tryTurnLeft();
        if (e.code == "KeyD" || e.code == "ArrowRight")
            snake.tryTurnRight();
    }
});
