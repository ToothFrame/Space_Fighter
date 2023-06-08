/* This is a simple Space shooter game in which you must try and shoot the enemies (right side of the screen) while avoiding their retaliatory fire.
controls are: up, down, left, and right arrow keys for movement, spacebar for firing. 
You can hold the spacebar for constant fire, however this comes with the downside of slowing the player by half as long as he is firing to prevent him from firing all the time
the player has 5 hitpoints, if they reach 0 the animation stops and presents the player with a "YOU LOSE" text, if all the enemies are defeated then the player is presented with a "YOU WIN" text, the animation
is intentionally not stopped in the latter case*/

import Scene from "./scene.js";
const ctx = canvas.getContext("2d");
const scene = new Scene(700, canvas);  //the first argument represents the amount of stars generated for the background

let p;

function frame(ts) {
    const elapsed = ts - p || 0;
    scene.update(elapsed / 1000);
    scene.draw(ctx);
    p = ts;
    if(!scene.winCheck()){
        ctx.font = "30pt Arial"
        ctx.fillText("YOU WIN", canvas.width/2 - 70, canvas.height/2, canvas.width)
        }
    if(!scene.status){
        ctx.font = "30pt Arial"
        ctx.fillText("YOU LOSE", canvas.width/2 - 70, canvas.height/2, canvas.width)
    }
    if(scene.status){
        requestAnimationFrame(frame);
    }
}
requestAnimationFrame(frame);