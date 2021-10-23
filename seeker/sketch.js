
let vehicle; 
let target; 

function setup() {
	createCanvas(windowWidth, windowHeight);
	vehicle = new Vehicle(100, 100)
}

function draw() {
	background(0);
	 fill(255, 0, 0); 
	 noStroke(); 
	target = createVector(mouseX, mouseY); 
	circle(target.x, target.y, 32)
	vehicle.seek(target)
	vehicle.update(); 
	vehicle.show();  
}
