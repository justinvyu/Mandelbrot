
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

// Checks if the set blows up under x amount of times
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

// Draws all points in the points array
function drawPoints(pointsArray, color) {
	for(var i = 0; i < pointsArray.length; i++) {
		ctx.fillStyle = color;
		ctx.fillRect(500+pointsArray[i][0]*300, 500-pointsArray[i][1]*300, 1, 1);
		console.log(i);
	}
}

// Canvas stuff
function canvas () {
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	canvas.height = 1000;
	canvas.width = 1000;
	document.body.appendChild(canvas);
}

function main(inc, accuracy, color) { // inc = increment, color = string color

	canvas();

	while(draw) {
		a += inc;
		if(a >= 2) {
			a = -2;
			b += inc;
		}
		if(b >= 2) {
			draw = false;
			//console.log("a: " + a + "  " + "b: " + b);
			//console.log("Done");
			//console.log(pointsArray);

			drawPoints(pointsArray, color);
		}
		x = 0;
		y = 0;
		if(doesSetBlowUp(accuracy)) {
			// add point to array
			pointsArray.push([a, b, iterateCount]);
		}
	}
}

main(0.005, 200, "black");
