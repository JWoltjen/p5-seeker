
let vehicle; 
let target; 

function setup() {
	createCanvas(windowWidth, windowHeight);
	vehicle = new Vehicle(100, 100)
	target = new Target(200, 100)
}

function draw() {
	background(0);


	let steering = vehicle.wander(); 
	vehicle.applyForce(steering);
	

	
	vehicle.update(); 
	vehicle.show(); 
	vehicle.edges()

}
