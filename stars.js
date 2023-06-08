export default class Star {
    constructor(x, y, size, distance){
        this.x = x;
        this.y = y;
        this.size = size;
        this.distance = distance
    }

    update(elapsed) {
        this.x -= 40 * elapsed 
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.translate(this.x/this.distance, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.size/(this.distance + 1), 0, Math.PI * 2)
        ctx.fill();
        ctx.restore();
    }
    
}