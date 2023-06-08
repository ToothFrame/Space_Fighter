import Star from "./stars.js";
import Player from "./player.js";
import BulletController from "./bulletController.js";
import Enemy from "./enemy.js";



export default class Scene {
    constructor(nStars, canvas) {
        this.stars = Array.from({length: nStars}, () =>{        //initialises the starfield
            return new Star(
                (Math.random() * canvas.width),
                Math.random() * canvas.height,
                1 + Math.random(),
                Math.random()
            );
        });
        this.bulletController = new BulletController();         
        this.player = new Player(0, 0, 50, this.bulletController);   
        this.enemies = [                                         //initialises enemies
            new Enemy(850, 50, 50, 10),
            new Enemy(810, 150, 50, 10),
            new Enemy(890, 200, 100, 20),
            new Enemy(810, 300, 50, 10),
            new Enemy(850, 400, 50, 10)
            ]
        this.status = true;                                         //state of the game 

    }

    update(elapsed) {                                               //updates starfield, bullets, enemies, player, and collisions
        this.starUpdate(elapsed) 
        this.bulletController.update(elapsed);
        this.enemies.forEach(bullet => {bullet.bulletController.update(elapsed)})
        this.enemiesUpdate(elapsed);
        this.player.update(elapsed);
        this.playerCollision();
    }

    draw(ctx) {                                                        //draws starfield, bullets, enemies and player
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.stars.forEach(star => {star.draw(ctx)});
        this.bulletController.draw(ctx);
        this.enemies.forEach(bullet => {bullet.bulletController.draw(ctx)})
        this.player.draw(ctx);
        this.enemies.forEach((enemy) => {enemy.draw(ctx)});
    }


    starUpdate(elapsed){                                                //starfield randomisation and handling of out of bounds stars, instead of being deleted, they are given
        this.stars.forEach(star => {                                    //new random parameters and placed outside of the canvas along the x direction
            star.update(elapsed);
            if(star.x < -star.size*2){
                star.x = canvas.width + (Math.random() * canvas.width),
                star.y = Math.random() * canvas.height,
                star.size = 1 + Math.random() * 2,
                star.distance = Math.random()}
        });
    }
    enemiesUpdate(){                                                    //checks for enemies health, if it equals or is less than 0 then the enemy is deleted
        this.enemies.forEach((enemy) =>{
            enemy.update();
            if(this.bulletController.collision(enemy)){
                if(enemy.health <= 0){
                    const index = this.enemies.indexOf(enemy)
                    this.enemies.splice(index, 1);
                }
            }
        })
    }

    playerCollision(){                                                  //checks for collisions only for the player and changes the game status if player health drops to 0
        this.enemies.forEach((enemy) =>{
            if(enemy.bulletController.collision(this.player)){
                if(this.player.health <= 0){
                    this.status = false;
                }
            }
        })
    }
    winCheck(){                                                         //if all the enemies in the array are removed then ends the game with a victory
        if(this.enemies.length == 0){
            return false;
        }
        return true;
    }
}
