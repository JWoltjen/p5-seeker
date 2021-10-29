
let vehicle; 
let target; 

function setup() {
	createCanvas(windowWidth, windowHeight);
	vehicle = new Vehicle(100, 100)
	target = new Target(200, 100)
}

function draw() {
	background(0);
	target = createVector(mouseX, mouseY)
	circle(target.x, target.y, 32)

	let steering = vehicle.arrive(target)
	vehicle.applyForce(steering);
	

	
	vehicle.update(); 
	vehicle.show(); 
	vehicle.edges()

}
