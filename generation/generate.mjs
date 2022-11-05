// original logic from: https://codepen.io/zimjs/pen/jOMZjOy

import zim from "https://zimjs.org/cdn/01/zim";


function getColors(address, numColors) {
    let colors = Array();
    for (let i=0; i < numColors; i++) {
        let offset = i * 6;
        let colorStr = address.substring(2+offset, 8+offset);
        colors.push(`#${colorStr}`); 
    }
    return colors;
}

function getCurveFactor(address) {
    let penultimateByte = address.substring(
        address.length-4,
        address.length-2)
    return parseInt(penultimateByte, 16);
}
function getSpeedFactor(address) {
    let speedNibble = address.substring(
        address.length-2,
        address.length-1)
    return parseInt(speedNibble, 16);
}
function getDelayFactor(address) {
    let delayNibble = address.substring(
        address.length-1,
        address.length)
    return parseInt(delayNibble, 16);
}

function getCurve(frame, address) {

    let curveFactor = getCurveFactor(address);
    let speedFactor = getSpeedFactor(address);
    let delayFactor = getDelayFactor(address);

	const stageW = frame.width;
	const stageH = frame.height;

    const params = {
        curve: curveFactor / 32, // curve 0-8
        speed: speedFactor / 2,  // speed 0-8
        delay: delayFactor / 8,  // delay 0-2
    }

	const segments = 180; // how many lines
	const delta = 360/segments; // angle for each line
	const inner = 50; // inner radius - multiplied by 2 at largest ring, etc.
	const outer = 200; // outer radius
	const variation = outer-inner; // maximum noise        
    let colorArr = getColors(address, 6);
	const colors = series(colorArr);
	let time = 0; 

    //console.log(colorArr);
    //console.log(params)

	var g = new Generator({
		stamp:gen,
		maxCount:segments,
        seed:address
	});

	// Generator lines do not fill (Generator shapes do)
	// so send info to Shape objects on stage
	var shapes = [];
	loop(6, i=>{
		shapes.push(new Shape(stageW, stageH).addTo());
	});

	function gen(count) {  
		let angle = delta*count*RAD;  // (0-360 degrees in radians)   
		loop(6, i=>{
			let noise = g.noise(
                params.curve*Math.sin(angle),
                params.curve*Math.cos(angle),
                time+i*params.delay);
			let radius = inner+variation*noise;
			g.push().translate(radius*(2-i*.3),0).pop();
			// find global position of generator 
			let p = g.drawing.localToGlobal(g.currentX, g.currentY);   
			// if first time then start the drawing otherwise draw line     
			if (count==1) shapes[i].c().f(colors()).mt(p.x, p.y);
			else shapes[i].lt(p.x, p.y); 
		});
		g.rotate(delta); // rotate delta each time              
	}
}


// main export
// expects an address string of length 42, starting with "0x"
// calls callback with dataURL of contents
export function getBlob(address, callback) {

    let frame = new Frame(FIT, 1024, 768, null, null, ready);

    function ready() {
        getCurve(frame, address);

        const canvas = document.getElementById('myCanvas');
        const dataURL = canvas.toDataURL();

        //console.log(dataURL);
        callback(dataURL);
    }
}
