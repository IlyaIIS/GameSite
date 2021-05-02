var MainMenu = function(_ctx, _color) {
    let mm = {};
    mm.ctx = _ctx;
    mm.color = _color;

    mm.buttons = [];
    mm.buttons.push(new Button(mm.ctx, "играть", w/3, h/2-80, mm.color, true, 10, 20, startGame ))
    mm.buttons.push(new Parameter(mm.ctx, "скорость", w/3, h/2-80 + 65, mm.color))
    mm.buttons.push(new Parameter(mm.ctx, "сложность карты", w/3, h/2-80 + 105, mm.color))


    mm.draw = () => {
        mm.ctx.fillStyle = "black"
        mm.ctx.fillRect(0,0,w,h)
        mm.buttons.forEach(button => { button.draw() });
    }

    return mm;
}

var font = "px Lucida Console";

var Button = function(ctx, string, _x, _y, color, isBorder = true, xInd = 0, yInd = 0, click = () => {}) {
    let button = {};
    button.ctx = ctx;
    button.string = string;
    button.x = _x;
    button.y = _y;
    button.xInd = xInd;
    button.yInd = yInd;
    button.color = color;
    button.isBorder = isBorder;
    button.click = click;

    button.font = "px Lucida Console";
    button.fontSize = 40;
    button.textWidth = string.length*button.fontSize*0.61;
    button.textHeight = button.fontSize*0.68;
    button.xSize = button.textWidth + button.xInd;
    button.ySize = button.textHeight + button.yInd;

    button.draw = () => {
        let ui = button.ctx;
        let x = button.x;
        let y = button.y;
        let xSize = button.xSize;
        let ySize = button.ySize;

        ui.font = button.fontSize + button.font;
        ui.fillStyle = button.color;
        ui.fillText(button.string, x + (xSize - button.textWidth)/2, y + ySize - 3 - (ySize-button.textHeight)/2)

        if (button.isBorder){
            ui.beginPath()
            ui.lineWidth = 4
            ui.strokeStyle = button.color
            ui.shadowColor = button.color
            ui.moveTo(x + xSize, y)
            ui.lineTo(x, y)
            ui.lineTo(x, y + ySize)
            ui.lineTo(x + xSize, y + ySize)
            ui.closePath()
            ui.stroke()
        }
    }

    button.isCollision = (_x, _y) => {
        let x = _x - 10;
        let y = _y - 10;
        return (button.x <= x && button.x + button.xSize >= x) && (button.y <= y && button.y + button.ySize >= y);
    }
    
    return button;
}

var Parameter = function(ctx, string, _x, _y, color) {
    let param = {};
    param.ctx = ctx;
    param.string = string;
    param.x = _x;
    param.y = _y;
    param.color = color;

    param.clickX = 0;
    param.clickY = 0;

    param.content = 1;
    param.buttonLeft = new Button(ctx, "<", _x, _y, color, false, 0, 0, () => {if (param.content>0) param.content--})
    param.buttonRight = new Button(ctx, ">", _x+50, _y, color, false, 0, 0, () => {if (param.content<9)param.content++})
    param.textBox1 = new Button(ctx, " ", _x+25, _y+3, color, false)
    param.textBox2 = new Button(ctx, param.string, _x+100, _y, color, false)

    param.font = "px Lucida Console";
    param.fontSize = 40;
    param.textWidth = string.length*param.fontSize*0.61;
    param.textHeight = param.fontSize*0.68;
    param.xSize = 100;
    param.ySize = param.textHeight;

    param.draw = () => {
        param.buttonLeft.draw();
        param.buttonRight.draw();
        param.textBox1.string = param.content.toString();
        param.textBox1.draw();
        param.textBox2.draw();
    }

    param.isCollision = (_x, _y) => {
        clickX = _x;
        clickY = _y;
        let x = _x - 10;
        let y = _y - 10;
        return (param.x <= x && param.x + param.xSize >= x) && (param.y <= y && param.y + param.ySize >= y);
    }

    param.click = () => {
        if (param.buttonLeft.isCollision(clickX, clickY))
            param.buttonLeft.click();
        if (param.buttonRight.isCollision(clickX, clickY))
            param.buttonRight.click();
    }

    return param;
}

function drawMenuDifficultySlider(_x, _y, color) {
    let fontSize = 40
    let ySize = fontSize
    let ui = drawer.ui;
    
    ui.fillStyle = color;
    ui.font = fontSize*0.7 + font
    ui.fillText("Сложность: ", _x-100, _y - ySize/5 )
    _x += 80
    ui.font = fontSize + font
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