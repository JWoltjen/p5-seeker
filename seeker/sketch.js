
let pursuer; 
let target; 

function setup() {
	createCanvas(windowWidth, windowHeight);
	pursuer = new Vehicle(100, 100)
	target = new Target(200, 100)
}

function draw() {
	background(0);


	let steering = pursuer.pursue(target)
	pursuer.applyForce(steering);
	
	let d = p5.Vector.dist(pursuer.pos, target.pos)
	if (d < pursuer.r + target.r){
		target = new Target(random(width), random(height))
	}

	pursuer.edges(); 
	pursuer.update(); 
	pursuer.show(); 
	target.edges();  
	target.update(); 
	target.show(); 
}
