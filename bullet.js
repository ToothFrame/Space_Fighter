export default class Bullet {
    constructor(x, y, speed, damage, colour){
        this.x = x
        this.y = y
        this.speed = speed
        this.damage = damage

        this.width = 20;
        this.height = 5;
        this.colour = colour
    }
    update(elapsed){   
        this.x += elapsed*this.speed

    }
    draw(ctx){                                                          
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collision(sprite){                                   // Collision detection method as found at 
        if(this.x < sprite.x + sprite.size &&            //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
            this.x + this.width > sprite.x &&
            this.y < sprite.y + sprite.size &&
            this.y + this.height > sprite.y){
                sprite.takeDamage(this.damage);
                return true;
            }
        return false;
    }
}
