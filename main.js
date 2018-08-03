var horizon;
var scrollSpeed;
var score;
var obstacles = [];
var runner;

function setup() {
    createCanvas(1200, 400);
    textAlign(CENTER);

    horizon = height - 40;
    score = 0;
    scrollSpeed = 6;

    var size = 20;
    runner = new Runner(size * 2, height - horizon, size);
    console.log("runner built");
    textSize(20);
}

function draw() {
    background(255);
    drawHUD();
    runner.draw();
    handleLevel(frameCount);
    runner.update(horizon);
    handleObstacles();
}

function drawHUD() {
    stroke(83, 83, 83);
    strokeWeight(2);
    line(0, horizon, width, horizon);

    noStroke();
    fill(83, 83, 83);
    text(score, width - 15, 30);
}

function handleObstacles() {
    for(var i = obstacles.length -1; i >= 0; i--) {
        obstacles[i].update(scrollSpeed);
        obstacles[i].draw();
        if(!obstacles[i].onScreen){
            obstacles.splice(i, 1);
        }
        else if(obstacles[i].hits(runner)){
            endGame();
        }
    }
}

function handleLevel(time) {
    if(time % 30 === 0){
        if(time % 120 === 0){
            scrollSpeed *= 1.05;
        }
        var newTime = noise(time);
        if(newTime > 0.5){
            newObstacle();
        }
        score++;
    }
}

function newObstacle() {
    var colour = color(random(255), random(255), random(255));
    var size = random(30) + 20;
    var obs = new Obstacle(width + size, size, horizon, colour);

    obstacles.push(obs);
    if(obstacles.length > 1){
        if(obstacles[obstacles.length - 1].x > obstacles[obstacles.length - 2].x - (0.05 * obstacles[obstacles.length - 2].x) && scrollSpeed < 7){
            obstacles.splice(obstacles.length - 1, 1);
        }
    }
}

function keyPressed() {
    if((keyCode == UP_ARROW || keyCode == 32) && runner.onGround){
        runner.jump();
    } else if((keyCode == DOWN_ARROW) && runner.onGround){
        runner.duck();
    }
}

function keyReleased(){
    if(keyCode == DOWN_ARROW){
        runner.stopDucking();
    }
}

function endGame(){
    noLoop();
    noStroke();
    fill(83, 83, 83);
    textSize(40);
    text("GAME OVER", width/2, height/2);
    textSize(20);
    text("Press F5 to Restart", width/2, height/2 + 20);
}