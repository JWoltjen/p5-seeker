class Vehicle {
    constructor(x, y) {
        this.pos = createVector(x, y); 
        this.vel = createVector(0, 0); 
        this.acc = createVector(0, 0); 
        this.maxSpeed = 4;
        this.maxForce = 0.01; 
        this.r = 16; 
    }

    flee(target){
        return this.seek(target).mult(-1)
    }

    seek(target){
        let force = p5.Vector.sub(target, this.pos); 
        force.setMag(this.maxSpeed)
        force.sub(this.vel)
        force.limit(this.maxForce); 
        return force
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
