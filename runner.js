function Runner(x, y, radius){
    this.x = x;
    this.y = y;

    this.jumpVel = 0;
    this.speed = 1;
    this.onGround = true;

    this.radius = radius;
    this.ducking = false;
}

Runner.prototype.update = function(platform) {
    var bottom = this.y + this.radius;
    var updateBottom = bottom + this.jumpVel;

    if(bottom <= platform && updateBottom >= platform){
        this.jumpVel = 0;
        this.y = platform - this.radius;
        this.onGround = true;
    } else if (platform - bottom > 1) {
        this.jumpVel += this.speed;
        this.onGround = false;
    }
    this.y += this.jumpVel;
}

Runner.prototype.jump = function() {
    if(!this.ducking) {
        this.jumpVel = -(this.radius * 0.7);
    }
}

Runner.prototype.duck = function() {
    if(!this.ducking) {
        console.log("started ducking");
        this.ducking = true;
        this.radius = this.radius/2;
        this.y += this.radius;
    }
}

Runner.prototype.stopDucking = function() {
    if(this.ducking) {
        console.log("stopped ducking");
        this.ducking = false;
        this.radius = this.radius * 2;
        this.y -= this.radius;
    }
}

Runner.prototype.draw = function() {
    fill('#FF0000');
    stroke(255);
    stroke(2);
    if(!this.ducking){
        ellipse(this.x, this.y, this.radius * 2);
    } else {
        ellipse(this.x, this.y + this.radius, this.radius *2, this.radius);
    }
}