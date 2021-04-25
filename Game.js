var bacg = document.getElementById("background"), bg = bacg.getContext('2d');
var forg = document.getElementById("foreground"), fg = forg.getContext('2d');
var parti = document.getElementById("particles"), pr = parti.getContext('2d');
var inter = document.getElementById("interface"), ui = inter.getContext('2d');
var w = 800
var h = 600

var rnd = Math.random

var cellSize = 30;
var colorBackground = "rgba(0,190,55,0.1)"
var colorWall = "rgba(0,190,55,1)"
var colorSnake = "rgba(155,235,0,1)"
var colors = [colorBackground, colorWall, colorSnake]
var partArr = new Array()

var Cell = function(_x, _y) {
    let cell = {}
    cell.x = _x
    cell.y = _y
    cell.type = 0
    return cell
}

function getCellsArr(width, height) {
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

function getCellXY(x,y) {
    return this.cellArr[y*this.xSize + x]
}

var field = {}
field.xSize = 18
field.ySize = 18
field.cellArr = getCellsArr(field.xSize, field.ySize)
field.getCellXY = (_x, _y) => field.cellArr[_y*field.xSize + _x]
field.draw = () => {
    field.cellArr.forEach(cell => {
        drawWall(cell.x, cell.y, colors[cell.type])
    });
}
field.clear = () => {
    bg.fillStyle = 'black';
    bg.fillRect(0,0,w,h)
    console.log(w + " " + h)
}

function clearForeground() {
    fg.clearRect(0,0,w,h)
}

function drawWall(_x, _y, color) {
    drawRectangle(bg, _x, _y, color, cellSize*0.15, cellSize*0.2)
}

function drawRectangle(ctx, _x, _y, color, indent, lineSize = cellSize*0.2, dir = 0) {
    _x = _x*cellSize + cellSize
    _y = _y*cellSize + cellSize

    ctx.beginPath()
    ctx.lineWidth = lineSize
    ctx.strokeStyle = color
    ctx.shadowColor = color
    ctx.moveTo(_x + cellSize - indent - dir, _y + indent)
    ctx.lineTo(_x + indent, _y + indent + dir)
    ctx.lineTo(_x + indent + dir, _y + cellSize - indent)
    ctx.lineTo(_x + cellSize - indent, _y + cellSize - indent - dir)
    ctx.closePath()
    ctx.stroke()
}

var BodyCell = function(_x, _y, _dir) {
    return {x: _x, y: _y, dir: _dir}
}

var Snake = function(_x, _y) {
    let snake = {}
    snake.bodyArr = [new BodyCell(_x, _y, 1), new BodyCell(_x, _y+1, 1)]
    snake.head = new BodyCell(_x, _y-1, 1)
    snake.length = 3
    snake.draw = () => {
        snake.drawHead()
        snake.drawBody()
    }
    snake.drawHead = () => {
        drawRectangle(fg ,snake.head.x, snake.head.y, colorSnake, cellSize*0.25, cellSize*0.2)
    }
    snake.drawBody = () => {
        snake.bodyArr.forEach(point => {
            drawRectangle(fg ,point.x, point.y, colorSnake, cellSize*0.35, cellSize*0.2)
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
                        partArr[partArr.length] = new Particle(_x, _y, rnd()*360)
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
        drawRectangle(fg, apple.x, apple.y, "red", cellSize*0.25, cellSize*0.1, cellSize/4 )
    }
}

var Particle = function(_x, _y, _dir) {
    let part = {}
    part.x = _x
    part.y = _y
    part.dir = _dir
    part.speed = 2+rnd()
    part.size = 4
    part.time = 0
    part.move = () => {
        part.x += part.speed*Math.cos(part.dir)
        part.y += part.speed*Math.sin(part.dir)
    }
    part.draw = (alp = 1) => {
        pr.beginPath();
        pr.fillStyle = "rgba(255,0,0,alp)".replace("alp",alp)
        pr.lineWidth = 1
        pr.fillRect(part.x-part.size, part.y-part.size, part.size, part.size)          
        pr.stroke();
    }
    return part
}

function drawParticles() {
    pr.clearRect(0,0,w,h)
    for (let i = 0; i < partArr.length; i++) {
        const part = partArr[i];
        part.draw(0.5)
        part.move()
        part.draw()
        part.time++
        if (part.time > 10+rnd()*30) partArr.splice(i,1)
    }
}

/////////////////////////////////////MainMenu////////////////////////////////////////
function drawMainMenu() {
    let menuColor = "rgba(0,255,0,1)"
    ui.fillStyle = "black"
    ui.fillRect(0,0,w,h)
    drawMenuButton("  Играть", w/3, h/2-80, menuColor)
    drawMenuDifficultySlider(w/2-40, h/2+20, menuColor)
    drawRectangle(ui, 100, 100, "red", cellSize*0.25, cellSize*0.1, cellSize/4 )
}

function drawMenuButton(string, _x, _y, color) {
    let fontSize = 40
    let xSize = string.length*fontSize*0.74
    let ySize = fontSize*1.2
    
    ui.font = fontSize + "px Verdana"
    ui.fillStyle = color;
    ui.fillText(string, _x + xSize*0.04, _y + ySize - ySize*0.2)

    ui.beginPath()
    ui.lineWidth = 4
    ui.strokeStyle = color
    ui.shadowColor = color
    ui.moveTo(_x + xSize, _y)
    ui.lineTo(_x, _y)
    ui.lineTo(_x, _y + ySize)
    ui.lineTo(_x + xSize, _y + ySize)
    ui.closePath()
    ui.stroke()
} 

function drawMenuDifficultySlider(_x, _y, color) {
    let fontSize = 40
    let ySize = fontSize
    
    ui.fillStyle = color;
    ui.font = fontSize*0.7 + "px Verdana"
    ui.fillText("Сложность: ", _x-100, _y - ySize/5 )
    _x += 80
    ui.font = fontSize + "px Verdana"
    ui.fillText(" 5", _x, _y )

    _y += ySize*0.1

    ui.beginPath()
    ui.lineWidth = 2
    ui.strokeStyle = color
    ui.shadowColor = color
    ui.moveTo(_x, _y)
    ui.lineTo(_x-10, _y-ySize/2)
    ui.lineTo(_x, _y - ySize)
    ui.moveTo(_x+fontSize*1.3, _y)
    ui.lineTo(_x+fontSize*1.3+10, _y-ySize/2)
    ui.lineTo(_x+fontSize*1.3, _y - ySize)
    ui.stroke()
}

function startGame() {
    userInGame = true

    ui.clearRect(0,0,w,h)
    field.clear()
    field.draw()
    snake.draw()
    apple.findPos()
    apple.draw()
}

/////////////////////////////////////MainFunc////////////////////////////////////////
var snake = new Snake(field.xSize/2, field.ySize/2) 

bg.shadowBlur = 10
fg.shadowBlur = 12

var userInGame = false

drawMainMenu()

let start = Date.now(); 
let timer = setInterval(function() {

 // let timePassed = Date.now() - start;

//   if (timePassed >= 2000) {
//     clearInterval(timer); // закончить анимацию через 2 секунды
//     return;
//   }

    if (userInGame)
    {
        snake.move()

        clearForeground()
        snake.draw()
        apple.draw()
    }

}, 500);

let timer2 = setInterval(function() {

  drawParticles()

}, 20);

$('body').mouseup(function(e){
    if (userInGame) {
        if (e.which == 1) snake.head.dir = (snake.head.dir+1)%4
        if (e.which == 3) snake.head.dir = (snake.head.dir+3)%4
    }
    else {
        startGame()
    }
});






// var rnd = Math.random
// var points = createPointsArray(300);

// function createPointsArray(num) {
//     let points = new Array();
//     for (let i = 0; i < num; i++){
//         points[i] = {x: rnd()*w, y: rnd()*h, xDir: rnd()*2-1, yDir: rnd()*2-1}
//     }
//     return points
// }

// function getPointDistance(point1, point2){
//     return Math.sqrt(Math.pow(point1.x - point2.x,2)+Math.pow(point1.y-point2.y,2))
// }

// function doGameStep() {
//     clearCanvas()
//     movePoints(points)
//     drawLines(points)
//     window.requestAnimationFrame( doGameStep );
// }

// function movePoints(points){
//     points.forEach(point => {
//         point.x += (point.x-coord.x)/w + point.xDir//point.xDir
//         point.y += (point.y-coord.y)/h + point.yDir//point.yDir
//         if (point.x < 0 || point.y < 0 || point.x > w || point.y > h){
//             point.x = rnd()*w
//             point.y = rnd()*h
//         }
//     });
// }

// var coord = {x: 0, y: 0}
// $('body').mousemove(function(e){
//     coord = getPosition(e);
// });

// function getPosition(e){
// 	var x = y = 0;
 
// 	if (!e) {
// 		var e = window.event;
// 	}
 
// 	if (e.pageX || e.pageY){
// 		x = e.pageX;
// 		y = e.pageY;
// 	} else if (e.clientX || e.clientY){
// 		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
// 		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
// 	}
 
// 	return {x: x, y: y}
// }

// var red = rnd()*255
// var bly = rnd()*255
// var gre = rnd()*255

// function updateColors() {
//     red += rnd()*4-2
//     if (red > 255) red = 255
//     if (red < 0) red = 0
//     bly += rnd()*4-2
//     if (bly > 255) bly = 255
//     if (bly < 0) bly = 0
//     gre += rnd()*4-2
//     if (gre > 255) gre = 255
//     if (gre < 0) gre = 0

    
// }

// function drawLines(points){
//     updateColors()
//     let color = "rgba(red,gre,bly,0.5)"
//     color = color.replace("red",red)
//     color = color.replace("gre",gre)
//     color = color.replace("bly",bly)
//     points.forEach(pointNow => {
//         points.forEach(pointEnd => {
//             if (getPointDistance(pointNow, pointEnd) <= 40)
//             {
//                 ctx.beginPath()
//                 ctx.lineWidth=2;
//                 ctx.strokeStyle=color
//                 //ctx.shadowBlur=0;
//                 //ctx.shadowColor="rgba(0,190,55,0.5)";
//                 ctx.moveTo(pointNow.x, pointNow.y)
//                 ctx.lineTo(pointEnd.x, pointEnd.y)
//                 ctx.stroke()
//             }
//         });
//     });
// }

// function clearCanvas() {
//     ctx.fillStyle = "rgba(0,0,0,0.2)"
//     ctx.fillRect(0,0,w,h)
// }

// function drawRandomLine() {
//     ctx.beginPath()
//     ctx.lineTo(rnd()*example.width,rnd()*example.height)
//     ctx.lineTo(rnd()*example.width,rnd()*example.height)
//     ctx.stroke()
    
//     //drawRandomLine()
// }

// // ctx.lineWidth=1;
// // ctx.strokeStyle="green";
// window.requestAnimationFrame( doGameStep );
// console.log(getPointDistance(points[0], points[1]))



// // ctx.fillStyle = "while"
// // ctx.beginPath()
// // ctx.lineWidth="5";
// // ctx.strokeStyle="green";
// // ctx.lineTo(rnd()*100,rnd()*100)
// // ctx.lineTo(rnd()*100,rnd()*100)
// // ctx.lineTo(rnd()*100,rnd()*100)
// // ctx.lineTo(rnd()*100,rnd()*100)
// // ctx.lineTo(rnd()*100,rnd()*100)
// // ctx.lineTo(rnd()*100,rnd()*100)
// // ctx.lineTo(rnd()*100,rnd()*100)
// // ctx.closePath()
// // ctx.stroke()