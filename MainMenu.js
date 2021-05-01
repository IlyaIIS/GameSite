var MainMenu = function(_ctx, _color) {
    let mm = {};
    mm.ctx = _ctx;
    mm.color = _color;

    mm.draw = () => {
        let menuColor = mm.color;
        mm.ctx.fillStyle = "black"
        mm.ctx.fillRect(0,0,w,h)
        drawMenuButton("  Играть", w/3, h/2-80, menuColor)
        drawMenuDifficultySlider(w/2-40, h/2+20, menuColor)
        drawRectangle(mm.ctx, 100, 100, "red", cellSize*0.25, cellSize*0.1, cellSize/4 )
    }

    return mm;
}

function drawMenuButton(string, _x, _y, color) {
    let fontSize = 40
    let xSize = string.length*fontSize*0.74
    let ySize = fontSize*1.2
    let ui = drawer.ui;
    
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
    let ui = drawer.ui;
    
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