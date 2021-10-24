
class Vehicle {
    constructor(x, y) {
        this.pos = createVector(x, y); 
        this.vel = createVector(0, 0); 
        this.acc = createVector(0, 0); 
        this.maxSpeed = 4;
        this.maxForce = 0.1; 
        this.r = 16; 
    }

    pursue(vehicle){
        let target = vehicle.pos.copy(); 
        let velocity = vehicle.vel.copy(); 
        velocity.mult(10); 
        target.add(velocity)
        target.add(vehicle.vel); 
        return this.seek(target);  
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

class Target extends Vehicle {
    constructor(x, y) {
        super(x, y); 
        this.vel = createVector(5, 2)
    }
    show(){
        stroke(255)
        strokeWeight(2);
        fill(255); 
        push()
        translate(this.pos.x, this.pos.y)
        
        circle(0,0, this.r*2)
        pop(); 
    }

}
