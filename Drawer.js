var bacg = document.getElementById("background");
var forg = document.getElementById("foreground");
var parti = document.getElementById("particles");
var inter = document.getElementById("interface");

var Drawer = function() {
    let drawer = {};
    drawer.bg = bacg.getContext('2d');
    drawer.fg = forg.getContext('2d');
    drawer.pr = parti.getContext('2d');
    drawer.ui = inter.getContext('2d');

    drawer.drawRectangle = (ctx, _x, _y, color, indent, lineSize = cellSize*0.2, dir = 0) => {
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

    drawer.drawParticles = (partArr) => {
        drawer.pr.clearRect(0,0,w,h)
        for (let i = 0; i < partArr.length; i++) {
            const part = partArr[i];
            part.draw(0.5)
            part.move()
            part.draw()
            part.time++
            if (part.time > 10+rnd()*30) partArr.splice(i,1)
        }
    }
    
    return drawer;
}