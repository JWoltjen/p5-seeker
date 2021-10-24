
let pursuer; 
let target; 

function setup() {
	createCanvas(windowWidth, windowHeight);
	pursuer = new Vehicle(100, 100)
	target = new Vehicle(200, 100)
}

function draw() {
	background(0);


	let steering = pursuer.seek(target.pos)
	pursuer.applyForce(steering); 

	pursuer.update(); 
	pursuer.show();  
	target.update(); 
	target.show(); 
}
