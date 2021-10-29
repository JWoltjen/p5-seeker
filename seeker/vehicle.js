
class Vehicle {
    constructor(x, y) {
        this.pos = createVector(x, y); 
        this.vel = createVector(1, 0); 
        this.acc = createVector(0, 0); 
        this.maxSpeed = 4;
        this.maxForce = 0.15; 
        this.r = 16;
        
        this.wanderTheta = PI/2;
      
        this.currentPath = []; 
        this.paths = [this.currentPath];
    }

    evade(vehicle){
        let pursuit = this.pursue(vehicle)
        pursuit.mult(-1); 
        return pursuit
    }

    randomWander() {
        let force = p5.Vector.random2D(); 
        this.applyForce(force)
    }
 
    wander(){
        let direction = this.vel.copy(); 
        direction.setMag(100);
        direction.add(this.pos); 
        fill(255, 0, 0); 
        circle(direction.x, direction.y, 8) 

        let dirRadius = 50; 
        circle(direction.x, direction.y, dirRadius *2); 

        let theta = this.wanderTheta + this.vel.heading();
        
        let x = dirRadius *cos(theta); 
        let y = dirRadius *sin(theta)
        fill(0, 255, 0); 
        noStroke(); 
        direction.add(x, y)
        circle(direction.x, direction.y, 16)

        let steer = direction.sub(this.pos)
        steer.setMag(this.maxForce)
        this.applyForce(steer)

        let displacementRange = 0.3
        this.wanderTheta += random(-displacementRange, displacementRange)
    }

    arrive(target){
        let force = p5.Vector.sub(target, this.pos); 
       let slowRadius = 100; 
       let d = force.mag(); 
       if (d < slowRadius) {
           let desiredSpeed = map(d, 0, slowRadius, 0, this.maxSpeed)
           force.setMag(desiredSpeed)
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

        this.currentPath.push(this.pos.copy())
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

        for (let path of this.paths){
            beginShape(); 
            noFill()
            for(let v of path){
                vertex(v.x, v.y); 
            }
            endShape(); 
            }
        }

    edges() {
        let hitEdge = false
        if(this.pos.x > width + this.r) {
            this.pos.x = -this.r; 
            hitEdge = true; 
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r; 
            hitEdge = true; 
        }
        if(this.pos.y > height + this.r){
            this.pos.y = -this.r; 
            hitEdge = true; 
        } else if( this.pos.y < -this.r){
            this.pos.y = height + this.r; 
            hitEdge = true; 
        }
        if(hitEdge){
            this.currentPath = []; 
            this.paths.push(this.currentPath)
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
