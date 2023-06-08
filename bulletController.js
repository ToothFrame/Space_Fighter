import Bullet from "/bullet.js"
export default class BulletController{
    bullets = [];
    fireTimer = 0;

    fire(x, y, speed, damage, rate, colour) {                           //here we add a timer for each shooter based on the parameters previously set 
        if(this.fireTimer <= 0){                                        //on the corresponding class, for each of these an array exists, and bullets are added to this array
            this.bullets.push(new Bullet(x, y, speed, damage, colour))  //at a frequency based on the rate parameter
            this.fireTimer = rate;
        }
        this.fireTimer --;
    }
    update(elapsed) {                                                   //checks each bullet if it's off screen and deletes it using the "isBulletOffScreen function defined below"
        this.bullets.forEach((bullet) => {
            if(this.isBulletOffScreen(bullet)){
                const index = this.bullets.indexOf(bullet);
                this.bullets.splice(index, 1);
            }
            bullet.update(elapsed);
            });
    }
    draw(ctx){
        this.bullets.forEach((bullet) => bullet.draw(ctx));
    }

    isBulletOffScreen(bullet){
        return bullet.x >= canvas.width + bullet.width || bullet.x <= 0 - bullet.width;
    }

    collision(sprite) {                                                  //uses the some method to check if ANY of the bullets in the array are colliding with a sprite, it then deletes that bullet
        return this.bullets.some(bullet=>{
            if(bullet.collision(sprite)){
                this.bullets.splice(this.bullets.indexOf(bullet),1);
                return true;
            }
            return false;
        });
    }
}