let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let blockSize = 10;
const levelWidth = 10;
const levelHeight = 10;
canvas.width = levelWidth * blockSize;
canvas.height = levelHeight * blockSize;
let X = 4, Y = 5;

let map = [
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,1,1,0,0,0,0,0,0],
[0,0,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,1,1,1,1,1,0,0,0],
[0,0,0,0,0,0,0,0,0,0]
];

let fpsOutput = document.getElementById("fps");
let times = [];
let timeStart = 0;
function update(timestamp) {
	// Calculating FPS
	const NOW = performance.now();
	while (times.length > 0 && times[0] <= NOW - 1000) {
		times.shift();
	}
	times.push(NOW)
	fps = times.length;
	fpsOutput.innerHTML = `FPS: ${fps}`;
	//ctx.fillText(`fps ${fps}`, 20,20);
	
	// Main loop
  if (timestamp - timeStart >= 100) {
      draw();
      timeStart = timestamp;
  }
  requestAnimationFrame(update);
}
update();

function draw() {
	ctx.fillStyle = "rgba(0,50,200)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// Drawing the map
	for (let i = 0; i < levelHeight; i++) {
		for (let j = 0; j < levelWidth; j++) {
			if (map[i][j] === 1) {
				ctx.fillStyle = "black";
				ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize)
			}
			if (map[i][j] === 0) {
				ctx.fillStyle = "gray";
				ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize)
			}
		}
	}
	
		//Drawing the rays
		ctx.fillStyle = "green";
		console.log((X*blockSize)/blockSize)
		castRay(X * blockSize, Y * blockSize, 0,0)
		
	// Drawing the player
	ctx.fillStyle = "blue";
	ctx.fillRect(X*blockSize,
							 Y*blockSize,
							 blockSize,
							 blockSize);
							 

};


let plot = (x,y) => {
	for (let i = 0; i < levelHeight; i++) {
		for (let j = 0; j < levelWidth; j++) {
			if(map[Math.floor(y/blockSize)][Math.floor(x/blockSize)] !== 1) {
				ctx.fillRect(x,y,1,1);
				return true;
			} 
		}
	}
};

let castRay = (x0,y0, x1,y1) => {
    let swap = false;
    let dx = x1-x0;
    let dy = y1-y0;
    
    if (Math.abs(dx) < Math.abs(dy)) {
        let tmp;
        tmp = dx; dx = dy; dy = tmp;
        swap = true
    }
    
    let a = Math.abs(dy);
    let b = -Math.abs(dx);
    
    let x = x0;
    let y = y0;
    
    let d = 2 * a + b;
    
    let q = 1;
    let s = 1;
    if (x0 > x1) q = -1;
    if (y0 > y1) s = -1;
    plot(x,y);
    for (let k=0; k < -b; k++) {
        if (d > 0) {
            x = x + q; y = y + s;
            d = d + 2 * (a + b);
        }
        else {
            x = x + q;
            if (swap) { y = y + s; x = x - q; }
            d = d + 2 * a;
        }
        plot(x,y)
    }
};

ctx.fillStyle = "green";
//ctx.fillStyle = "rgb(0,0,255)";
//castRay(8,0,4,4)
