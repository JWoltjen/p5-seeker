
class Vehicle {
    constructor(x, y) {
        this.pos = createVector(x, y); 
        this.vel = createVector(1, 0); 
        this.acc = createVector(0, 0); 
        this.maxSpeed = 8;
        this.maxForce = 0.25; 
        this.r = 16; 
    }

    evade(vehicle){
        let pursuit = this.pursue(vehicle)
        pursuit.mult(-1); 
        return pursuit
    }

    wander(){
        let dir = this.vel.copy(); 
        dir.setMag(100);
        dir.add(this.pos); 
        fill(255, 0, 0); 
        circle(dir.x, dir.y, 8) 

        let dirRadius = 50; 
        circle(dir.x, dir.y, dirRadius *2); 

        let theta = 0; 
        let x = dirRadius *cos(theta); 
        let y = dirRadius *sin(theta)
    }

    arrive(target){
        let force = p5.Vector.sub(target, this.pos); 
       let r = 100; 
       let d = force.mag(); 
       if (d < r) {
           let m = map(d, 0, r, 0, this.maxSpeed)
           force.setMag(m)
       } else {
           force.setMag(this.maxSpeed)
       }
       force.sub(this.vel)
       force.limit(this.maxForce)
       return force
    }

    pursue(vehicle){
        let target = vehicle.pos.copy(); 
        let prediction = vehicle.vel.copy(); 
        prediction.mult(10)
        target.add(prediction)
        fill(0, 255, 0)
        circle(target.x, target.y, 16)
        
        return this.seek(target);   
    }

    flee(target){
        return this.seek(target).mult(-1)
    }

    seek(target){
       let desired = p5.Vector.sub(target, this.pos); 
       desired.setMag(this.maxSpeed)
       let steer = p5.Vector.sub(desired, this.vel)
       steer.limit(this.maxForce)
       this.applyForce(steer)
    }
    applyForce(force){
        this.acc.add(force); 
    }

    update() {
        this.vel.add(this.acc); 
        this.vel.limit(this.maxSpeed)
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

    edges() {
        if(this.pos.x > width + this.r) {
            this.pos.x = -this.r; 
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r; 
        }
        if(this.pos.y > height + this.r){
            this.pos.y = -this.r; 
        } else if( this.pos.y < -this.r){
            this.pos.y = height + this.r; 
        }
    }
}

class Target extends Vehicle {
    constructor(x, y) {
        super(x, y);
        this.vel = p5.Vector.random2D(); 
        this.vel.mult(5)
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
