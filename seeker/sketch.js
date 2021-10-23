
let vehicle; 

function setup() {
	createCanvas(windowWidth, windowHeight);
	vehicle = new Vehicle(100, 100)
}

function draw() {
	background(0)

	vehicle.update(); 
	vehicle.show(); 
}
