var Particle = function(_ctx, _x, _y, _dir, _RGB) {
    let part = {};
    part.ctx = _ctx;
    part.x = _x;
    part.y = _y;
    part.dir = _dir;
    part.color = _RGB.slice(0, _RGB.length - 1) + ",alp)";
    part.speed = 2+rnd();
    part.size = 4;
    part.time = 0;

    part.move = () => {
        part.x += part.speed*Math.cos(part.dir);
        part.y += part.speed*Math.sin(part.dir);
    }

    part.draw = (alp = 1) => {
        part.ctx.beginPath();
        part.ctx.fillStyle = part.color.replace("alp",alp);
        part.ctx.lineWidth = 1;
        part.ctx.fillRect(part.x-part.size, part.y-part.size, part.size, part.size);    
        part.ctx.stroke();
    }

    return part
}

function createParticles(_x, _y, num, _RGB) {
    for (let i = 0; i < num; i++) {
        let x = _x*cellSize+cellSize*1.5+(rnd()*2-1)*cellSize*0.1
        let y = _y*cellSize+cellSize*1.5+(rnd()*2-1)*cellSize*0.1
        partArr[partArr.length] = new Particle(drawer.pr, x, y, rnd()*360, _RGB)
    }
}