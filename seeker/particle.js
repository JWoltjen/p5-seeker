class Vehicle {
    constructor(x, y) {
        this.pos = createVector(x, y); 
        this.vel = createVector(0, 0); 
        this.acc = createVector(0, 0); 
        this.maxSpeed = 4;
        this.maxForce = 0.01; 
        this.r = 16; 
    }
    seek(target){
        let desired = p5.Vector.sub(target, this.pos); 
        desired.setMag(this.maxSpeed)
        let steering = p5.Vector.sub(desired, this.vel); 
        steering.limit(this.maxForce)
        this.applyForce(steering); 
    }
    applyForce(force){
        this.acc.add(force); 
    }

    update() {
        this.vel.add(this.acc); 
        this.pos.add(this.vel); 
        this.acc.set(0,0)
    }

    show(){
        stroke(255); 
        strokeWeight(2); 
        fill(255); 
        push();
        translate(this.pos.x, this.pos.y); 
        rotate(this.vel.heading());
        triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r/2, 0); 
        pop();
    }
}
