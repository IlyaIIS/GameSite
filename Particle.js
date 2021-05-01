var Particle = function(_ctx, _x, _y, _dir) {
    let part = {};
    part.ctx = _ctx;
    part.x = _x;
    part.y = _y;
    part.dir = _dir;
    part.speed = 2+rnd();
    part.size = 4;
    part.time = 0;

    part.move = () => {
        part.x += part.speed*Math.cos(part.dir);
        part.y += part.speed*Math.sin(part.dir);
    }

    part.draw = (alp = 1) => {
        part.ctx.beginPath();
        part.ctx.fillStyle = "rgba(255,0,0,alp)".replace("alp",alp);
        part.ctx.lineWidth = 1;
        part.ctx.fillRect(part.x-part.size, part.y-part.size, part.size, part.size);    
        part.ctx.stroke();
    }

    return part
}