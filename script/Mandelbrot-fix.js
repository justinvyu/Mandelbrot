/*
Goodbye playground.js
It was nice knowing you...
*/

var 
a = -2, 
b = -2, 
x = 0, 
y = 0, 
temp = 0, 
iterateCount = 0,
draw = true,
pointsArray = [],
canvas,
ctx;

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

function iterate() {
	temp = x * x - y * y + a;
	y = 2 * x * y + b;
	x = temp;
}

function doesSetBlowUp(times) {
	for(var i = 0; i < times; i++) {
		iterate();

		iterateCount++;
		if(x * x + y * y > 4.) {
			return true;
		}
	}
	return false;
}

function drawPoints(pointsArray) {
	for(var i = 0; i < pointsArray.length; i++) {
		ctx.fillStyle = "black";
		ctx.fillRect(200+pointsArray[i][0]*100, 200-pointsArray[i][1]*100, 1, 1);
		console.log(i);
	}
}

function canvas () {
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	canvas.height = 580;
	canvas.width = 580;
	document.body.appendChild(canvas);
}

function main() {

	canvas();

	while(draw) {
		a += 0.01;
		if(a >= 2) {
			a = -2;
			b += 0.01;
		}
		if(b >= 2) {
			draw = false;
			//console.log("a: " + a + "  " + "b: " + b);
			//console.log("Done");
			console.log(pointsArray);

			drawPoints(pointsArray);
		}
		x = 0;
		y = 0;
		if(doesSetBlowUp(100)) {
			// add point to array
			pointsArray.push([a, b, iterateCount]);
		}
	}
}

main();