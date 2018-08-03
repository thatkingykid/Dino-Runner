function Obstacle(x, size, horizon, color) {
    this.x = x;
    var birdOrCactus = Math.random() >= 0.5
    if(birdOrCactus){
        this.y = horizon - size;
    } else {
        this.y = horizon - (size * 2);
    }
    this.size = size;
    this.color = color;
    this.onScreen = true;
}

Obstacle.prototype.update = function(speed) {
    this.onScreen = (this.x > -this.size);
    this.x -= speed;
}

Obstacle.prototype.draw = function() {
    console.log("draw function called");
    fill(this.color);
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size);
}

Obstacle.prototype.hits = function(runner){
    console.log("collision method called");
    var halfSize = this.size / 2;
    var minDistance = halfSize + (runner.radius);

    var centerX = this.x + halfSize;
    var centerY = this.y + halfSize;

    var collisionDistance = dist(centerX, centerY, runner.x, runner.y);
    return collisionDistance < minDistance;
}