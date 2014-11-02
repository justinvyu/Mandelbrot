/*
	REALLY SLOW ;( 
	thanks playground
*/

var app = playground({
	width: 580,
	height: 580,

	x: 0,
	y: 0,
	a: -2,
	b: -2,
	temp: 0,
	draw: true,

	// Numberphile
	// fc(z) = z^2 + c
	// z = x + yi
	// c = a + bi
	/*
	fc(z) = (x+yi)(x+yi) + (a+bi)
	fc(z) = x * x + 2xyi - (y * y) + a + bi
	fc(z) = (x * x - [y * y] + a) + (2xy + b)i

	real = x * x - y * y + a
	imaginary = 2 * x * y + b
	*/

	iterate: function() {
		this.temp = this.x * this.x - this.y * this.y + this.a;
		this.y = 2 * this.x * this.y + this.b
		this.x = this.temp;
	},

	drawAB: function() {
		this.layer
			.fillStyle("#000")
			.stroke()
			.circle(200+this.a*100, 200-this.b*100, 2)
			.fill()
			.save();
	},

	doesSetBlowUp: function(times) {
		for(var i = 0; i < times; i++) {
			this.iterate();

			if(this.x * this.x + this.y * this.y > 4.) {
				return true;
			}
		}
		return false;
	},


	// Playground Functions

	step: function(delta) {c
		if(this.draw) {
			this.a += 0.05;
			if(this.a >= 2) {
				this.a = -2;
				this.b += 0.05;
			}
			if(this.b >= 2) {
				this.draw = false;
			}
			this.x = 0;
			this.y = 0;
			if(this.doesSetBlowUp(50))
				this.drawAB();
		}
	},

	render: function() {
		this.layer.clear("#FFF");
		//this.printCoordinate();

		// Start iterations / drawing
		this.drawAB();
	}

});
