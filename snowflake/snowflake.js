class SnowFlake {
    constructor(img) {
      this.img = img;
      this.pos = createVector();
      this.acc = createVector();
      this.pos.x = random(width);
      this.pos.y = random(height);
      this.r = random(1, 32);
      this.vel = createVector();
      this.angle = random(TWO_PI);
    }
    
    randomise() {
      this.vel = createVector();
      this.acc = createVector();
      this.pos.x = random(width);
      this.pos.y = random(-100, -10);
      this.r = random(1, 32);
    }
    
    applyForce(force) {
      let f = force.copy();
      f.mult(this.r);
      this.acc.add(f);
    }
    
    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.r * 0.2);
  
      if (this.vel.mag() < 1) {
        this.vel.normalize();
      }
      this.pos.add(this.vel)
      this.pos.x += sin(this.angle);
      if (this.isOffscreen()) {
        this.randomise();
      }
      this.angle += PI / 100
    }
    
    render() {
      stroke(255);
      strokeWeight(this.r);
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      imageMode(CENTER);
      image(this.img, 0, 0, this.r, this.r);
      pop();
    }
    
    isOffscreen() {
      return this.pos.y > height + this.r;
    }
  }