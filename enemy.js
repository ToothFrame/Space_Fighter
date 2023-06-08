import BulletController from "./bulletController.js";
export default class Enemy{
    constructor(x, y, size, health){
        this.x = x;
        this.y = y;
        this.size = size;
        this.health = health;
        this.img = new Image();
        this.img.src = "enemyShip.png";
        this.bulletController = new BulletController()
        
    }

    update(){                                       
        this.fire();
    }

    fire(){                                                     //because the enemies' bullets behave essentially the same as the player'
        const speed = -300;                                     //means that reversing the speed and changing the colour will work perfectly
        const rate = 100 + Math.random()*50;                    //the enemies' rate of fire is given a more random speed to add variety and difficulty
        const damage = 1;
        const bulletX = this.x - this.size/2;
        const bulletY = this.y + this.size/2;
        const colour = "red";
        this.bulletController.fire(bulletX, bulletY, speed, damage, rate, colour);
    }

    draw(ctx) {
        ctx.save();
        ctx.shadowColor = "red";    
        ctx.shadowBlur = 10;
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y - 15, this.health * 5, 5)       //healthbar displayed on top of each enemy
        ctx.restore();
    }

    takeDamage(damage){
        this.health -= damage;
    }
}