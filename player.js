export default class Player{ 
    constructor(x, y, size, bulletController){
        this.x = x;
        this.y = y;
        this.health = 5;
        this.size = size;           //because the image is a perfect square, there is no need for height and width
        this.img = new Image();
        this.img.src = "ship.png";
        this.bulletController = bulletController;
        this.speed = 200
    }
    
    update(elapsed){
        this.speed = 200
        if(keys.Space){this.speed = 100}        //player is slowed when holding spacebar
        this.x -= (keys.ArrowLeft - keys.ArrowRight) * elapsed * this.speed 
        this.y -= (keys.ArrowUp - keys.ArrowDown) * elapsed* this.speed
        this.boundsCheck()
        this.fire();
        console.log(this.health)
    }

    draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.shadowColor = "green";
            ctx.shadowBlur = 10;
            ctx.drawImage(this.img, 0, 0, this.size, this.size);
            ctx.restore();
        }

    fire() {
        if(keys.Space){                  //fires bullets (green to represent the player)
            const speed = 500;
            const rate = 20;                //responsible for how quickly the player fires
            const damage = 1;
            const bulletX = this.x + this.size/2;       //these exist so the bullets are fired from the middle of the player's sprite
            const bulletY = this.y + this.size/2;
            const colour = "green"
            this.bulletController.fire(bulletX, bulletY, speed, damage, rate, colour)
        }
    }
    takeDamage(damage) {
        this.health -= damage
    }
    boundsCheck() {                 //makes sure the player does not cross the intended boundaries
        if(this.x< 0){
            this.x = 0
        }
        if(this.x > canvas.width/2 - this.size){
            this.x = canvas.width/2 - this.size
        }
        if(this.y<0){
            this.y = 0
        }
        if(this.y> canvas.height - this.size){
            this.y= canvas.height - this.size
        }
    }
    
}
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Space: false
}

window.addEventListener('keydown', ev => {
    keys[ev.code] = true;
    });
 
 window.addEventListener('keyup', ev => {
     keys[ev.code] = false;
    });
