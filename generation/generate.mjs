// original logic from: https://codepen.io/zimjs/pen/jOMZjOy

//import zim from "https://zimjs.org/cdn/01/zim";
import zim, { Rectangle } from "./scripts/zim.mjs";


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

function getCurve(frame, address, extraSeed="") {

  let curveFactor = getCurveFactor(address);
  let speedFactor = getSpeedFactor(address);
  let delayFactor = getDelayFactor(address);

  const stage = frame.stage;
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
  const colorArr = getColors(address, 6);
	const colors = series(colorArr);
	let time = 0; 

  //console.log(colorArr);
  //console.log(params)

  if (extraSeed != "") {
    drawSquares(stageW, stageH, extraSeed);
  }

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

    addLogo();
}

function addLogo() {
    const h = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="548"><path d="M190.06228,50.93687c-14.74219-14.74219-41.61011-12.981-69.605,2.11328-4.17969,2.24951-3.86744,11.48926.09057,13.90723A164.43163,164.43163,0,0,1,174.012,120.50181c2.40577,3.95947,11.75342,4.0957,13.937.04053q-.77125-1.43409-1.58667-2.86328.81188,1.42894,1.58667,2.86279C203.04348,92.54722,204.80446,65.67906,190.06228,50.93687ZM158.90749,82.09165a174.67491,174.67491,0,0,0-26.1936-21.645c10.83764-5.01171,21.16211-7.69824,29.907-7.69824,7.81885,0,14.37964,2.14356,18.92822,6.6919,9.65039,9.6499,8.50318,28.32666-.99634,48.84521A176.33238,176.33238,0,0,0,158.90749,82.09165Z" style="fill:#ffc750;fill-rule:evenodd"/><path d="M196.573,140.72788a116.46775,116.46775,0,0,0-8.624-20.186v.00049c-2.21363-4.11621-11.53858-3.99219-13.937-.04053a159.40787,159.40787,0,0,1-23.61767,29.897,159.24951,159.24951,0,0,1-29.84644,23.6377c-3.958,2.41748-4.136,11.7334-.09057,13.90674,14.90307,8.04052,29.48437,12.29687,42.09326,12.29687,11.06909,0,20.61865-3.28027,27.51172-10.17383C200.84963,179.27915,203.15407,161.75962,196.573,140.72788Zm-15.02393,40.8252c-9.65039,9.65039-28.31689,8.49316-48.8352-1.00586a174.67751,174.67751,0,0,0,26.1936-21.64551,175.80015,175.80015,0,0,0,21.65527-26.15332C190.052,153.25669,191.19948,171.91294,181.54909,181.55308Z" style="fill:#ff6895;fill-rule:evenodd"/><path d="M120.4573,53.05015a115.73832,115.73832,0,0,0-20.19629-8.624c-21.02149-6.58106-38.541-4.27686-49.32837,6.51074-6.89307,6.89306-10.17359,16.44287-10.17359,27.51221,0,12.60888,4.2566,27.1997,12.28687,42.103,2.18359,4.04541,11.50024,3.8628,13.917-.10058a164.25645,164.25645,0,0,1,53.585-53.49414C124.48122,64.56626,124.563,55.25376,120.4573,53.05015ZM60.45241,108.2855C50.9529,87.767,49.79567,69.09019,59.44607,59.44029c7.45654-7.457,20.67919-8.71485,37.22265-3.522a98.52291,98.52291,0,0,1,11.61231,4.498A180.34782,180.34782,0,0,0,60.45241,108.2855Z" style="fill:#5fc5a6;fill-rule:evenodd"/><path d="M120.54787,174.03648a159.08955,159.08955,0,0,1-29.94726-23.6377,159.077,159.077,0,0,1-23.6377-29.94726c-2.39819-3.9292-11.71338-4.00489-13.917.10058a116.30665,116.30665,0,0,0-8.614,20.17578c-6.59107,21.03174-4.27662,38.55127,6.50073,49.33838,6.76245,6.75244,16.16089,10.18409,27.41137,10.18409a73.69521,73.69521,0,0,0,21.917-3.68311,116.54045,116.54045,0,0,0,20.19629-8.624C123.70754,186.20249,124.47707,176.43443,120.54787,174.03648ZM96.66872,185.08531c-16.54346,5.18212-29.76611,3.92431-37.22265-3.53223-7.45679-7.45654-8.71485-20.6792-3.53223-37.22266a97.82212,97.82212,0,0,1,4.498-11.60254,176.19888,176.19888,0,0,0,21.68554,26.17383A174.45515,174.45515,0,0,0,108.281,180.577,96.9966,96.9966,0,0,1,96.66872,185.08531Z" style="fill:#5666f6;fill-rule:evenodd"/><polygon points="93.642 119.773 120.5 77.568 147.358 119.773 120.5 135.121 93.642 119.773" style="fill:#1f294f;fill-rule:evenodd"/><polygon points="93.642 126.982 120.5 142.329 147.358 126.982 120.5 163.432 93.642 126.982" style="fill:#1f294f;fill-rule:evenodd"/><path d="M132.71384,60.44648a126.06685,126.06685,0,0,0-12.166,6.5107,118.99183,118.99183,0,0,0-12.26674-6.54089,141.57432,141.57432,0,0,1,12.1761-7.3661Q126.6158,56.35574,132.71384,60.44648Z" style="fill:#5f9a34;fill-rule:evenodd"/><path d="M187.949,120.54216c-2.18356,4.05534-4.64917,8.14072-7.38624,12.20617a126.74541,126.74541,0,0,0-6.55094-12.24646,128.481,128.481,0,0,0,6.54088-12.21625Q184.62848,114.36833,187.949,120.54216Z" style="fill:#ff512f;fill-rule:evenodd"/><path d="M132.71384,180.547c-.84529.57366-1.69057,1.12717-2.53585,1.67035-3.2202,2.073-6.47044,3.98511-9.72076,5.726q-6.06792-3.26023-12.17609-7.3661a118.99663,118.99663,0,0,0,12.26673-6.54088A121.87924,121.87924,0,0,0,132.71384,180.547Z" style="fill:#552990;fill-rule:evenodd"/><path d="M66.96293,120.4514A121.24579,121.24579,0,0,0,60.412,132.72808c-2.727-4.05534-5.18239-8.13065-7.36611-12.176,2.20372-4.10572,4.67925-8.21147,7.4064-12.26661A121.85278,121.85278,0,0,0,66.96293,120.4514Z" style="fill:#204fa0;fill-rule:evenodd"/><path d="M744.67834,154.0489v6.66616a7.43818,7.43818,0,0,1-3.83532,1.02568,11.872,11.872,0,0,1-11.76258-8.84548,26.485,26.485,0,1,1-.76715-36.79217V109.4368h7.927v37.94594c0,4.74334,2.42926,6.66616,5.24194,6.66616Zm-16.365-18.97281a18.66636,18.66636,0,1,0-18.66613,18.7166A18.69146,18.69146,0,0,0,728.31329,135.07609ZM754.672,83.411H763v78.33334h-8.328ZM671.39172,134.731A27.00678,27.00678,0,0,1,655.03,159.6543a26.37308,26.37308,0,0,1-28.99378-5.7029v6.75316h-7.94384V81.74437h7.94384v33.76595A26.373,26.373,0,0,1,655.03,109.80745,27.0067,27.0067,0,0,1,671.39172,134.731Zm-7.94354,0a18.70774,18.70774,0,1,0-18.706,18.96088,18.51935,18.51935,0,0,0,13.24475-5.53567,19.03243,19.03243,0,0,0,5.4613-13.42521Zm-113.64563.34686A26.63776,26.63776,0,1,1,557.60217,153.94,26.65819,26.65819,0,0,1,549.80255,135.07782Zm45.35553,0a18.70584,18.70584,0,1,0-18.70569,18.71793A18.71182,18.71182,0,0,0,595.15808,135.07782Zm-85.331-15.9271v2.32142c.13461,20.10988-14.36408,37.19458-33.86414,39.90427s-37.93658-9.79841-43.06167-29.21481,4.65524-39.70221,22.84368-47.381a38.73242,38.73242,0,0,1,48.9079,17.089l-6.94092,3.998a30.56236,30.56236,0,0,0-37.22451-14.169,31.62625,31.62625,0,0,0-20.0484,35.04322,30.75379,30.75379,0,0,0,60.80651.147H470.83087v-7.738Zm16.657-35.73969h8.328v78.33334h-8.328Zm-108.26431,0v78.33334H401.43542V130.15H370.17334v31.59436h-16.9122V83.411h16.9122V114.8749h31.26208V83.411Zm-71.621,15.27505H327.475v63.05829h-16.5907V98.68608H291.63376V83.411h54.965Zm-89.546-.13061v16.45007h25.3211v15.14451h-25.3211V146.5999H286.637v15.14447H240V83.411h46.637V98.55547Z" style="fill:#1f294f"/></svg>';
	new SVG(h,800,240)
		.sca(.3).alp(.7).hov(1).expand(10).pos(30,36,LEFT,BOTTOM);
}

function numToColor(x) {
  let colorStr = x.toString(16);

  while (colorStr.length < 6) {
    colorStr = '0' + colorStr;
  }

  let l = colorStr.length;
  return `#${colorStr.substring(l-6, l)}`
}

function getColor(x) {
  let colorMult = 0x978349;
  let colorNum = (x+1) * colorMult;
  return numToColor(colorNum);
}


function drawSquares(width, height, seed) {
  /// In Node.js
  /*
  const seedrandom = require('seedrandom');
  const rng = seedrandom('[your seed here]');
  */
  // On The Browser
  const rng = new Math.seedrandom(seed);
  //let randomNumber = rng();

  let canvasSize = Math.min(width, height);
  let numSquares = 16;
  let squareSize = canvasSize / numSquares;

  for (let i=0; i < numSquares/2; i++) {
    for (let j=0; j < numSquares/2; j++) {
      let curColor = numToColor(rng());
      new Rectangle(squareSize, squareSize, curColor)
        .loc(i * squareSize, j * squareSize)
        .alp(0.3);
      new Rectangle(squareSize, squareSize, curColor)
        .loc(i * squareSize + canvasSize/2, j * squareSize)
        .alp(0.3);
      new Rectangle(squareSize, squareSize, curColor)
        .loc(i * squareSize, j * squareSize + canvasSize/2)
        .alp(0.3);
      new Rectangle(squareSize, squareSize, curColor)
        .loc(i * squareSize + canvasSize/2, j * squareSize + canvasSize/2)
        .alp(0.3);
    }
  }
}

// main export
// expects an address string of length 42, starting with "0x"
// optional "extra" string argument for mixing
// calls callback with dataURL of contents
export function getBlob(address, callback, extra) {

    let frame = new Frame(FIT, 800, 800, null, null, ready);

    function ready() {
        getCurve(frame, address, extra);

        const canvas = document.getElementById('myCanvas');
        const dataURL = canvas.toDataURL();

        //console.log(dataURL);
        callback(dataURL);
    }
}
