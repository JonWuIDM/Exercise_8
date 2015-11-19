// VARIABLES HERE
var ship;
var xpos1 = 250;
var ypos1 = 250;
// PARTICLE STUFF
var system1;
 


function setup(){
	createCanvas(windowWidth, windowHeight);
	// CUSTOM CLASS
	ship = new Craft();
	system1 = new ParticleSystem(createVector(xpos1+120,ypos1+120));

}

function draw(){
	background(70);

	// CALL CRAFT
	system1.addParticle();
  	system1.run();
  	ship.display();


}// DRAW
// SIMPLE OBJECT
// CUSTOM CLASS CONSTRUCTOR
// ALL CLASSES = CAP

// <<<<<<<<<<<<<<<<<<<<<< SHIP OBJECT CLASS >>>>>>>>>>>>>>>>>
function Craft(){
	this.xpos = xpos1;
	this.ypos = ypos1;
	
}
// CLASS METHODS
// METHOD FOR DIMENSIONS,ETC
Craft.prototype.display = function(){
	fill(255);
	noStroke();
	rect(xpos1+100, ypos1+100, 50, 50);
}

//<<<<<<<<<<<<<<<<<< PARTICLE SYSTEM >>>>>>>>>>>>>>>>>>>>>>



// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(-.1, 0.05);
  // -/+ opposite REFER TO X,Y,Z CORDS 
  this.velocity = createVector(random(-2, 0), random(-2, 0));
  this.position = position.copy();
  this.lifespan = 90.0;
};


// Method to update position
Particle.prototype.update = function(){
	// LEAVE AS DEFAULT
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  // DECAY RATE  MORE THE FASTER THE DECAY IS
  this.lifespan -= 1;
};

// SHOWING THE ACTUAL CIRCLES HERE
// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(125, 80, 175, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
  fill(90, 140, 175, this.lifespan);
  ellipse(this.position.x, this.position.y, 50, 50);
};


// ADDS MORE PARTICLES  
var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};


/*<<<<<<<<<<<<<<<<<<<DEFAULTS>>>>>>>>>>>>>>>>>>>>>
*/ 

// CONTAINS UPDATE AND DISPLAY IN ONE
Particle.prototype.run = function() {
  this.update();
  this.display();
};


// DETERMINES WHETHER OR NOT THE PARTICLE IS DEAD OR NOT
// Is the particle still useful?
// LEAVE DEFAULT
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};


// LEAVE DEFAULT
ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

