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
	iterateCount: 0,

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

	paint: function() {
		this.layer
			.fillStyle("#0FF")
			.rect(200+this.a*100, 200-this.b*100, 2, 2)
			.fill();
	},

	doesSetBlowUp: function(times) {
		for(var i = 0; i < times; i++) {
			this.iterate();

			this.iterateCount++;
			if(this.x * this.x + this.y * this.y > 4.) {
				return true;
			}
		}
		return false;
	},


	// Playground Functions

	step: function(delta) {
		if(this.draw) {
			for(var i = 0; i < 50; i++) {
				this.a += 0.04;
				if(this.a >= 2) {
					this.a = -2;
					this.b += 0.04;
				}
				if(this.b >= 2) {
					this.draw = false;
				}
				this.x = 0;
				this.y = 0;
				if(this.doesSetBlowUp(50))
					this.paint();
				this.iterateCount = 0;
			}
		}
	},

	render: function() {
		this.layer.clear("#FFF");
		//this.printCoordinate();

		// Start iterations / drawing
		this.paint();
	}

});
