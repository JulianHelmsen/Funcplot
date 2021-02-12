const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let mouseDown = false;

let cameraWidth = 20;
let cameraHeight;
let cameraX = 0;
let cameraY = 0;

let f = new Expression("2 * x * x + 1*x + 0.5*x*x*x");

function drawFunc(ctx, transform, f) {
    
    ctx.beginPath();
    ctx.strokeStyle = "rgb(255, 0, 0)";
    const w = transform.right - transform.left;
    
    let prev = transformPoint(transform, {x: transform.left, y: f.evaluate(transform.left)});
    ctx.moveTo(prev.x, prev.y);
    for(let x = transform.left; x < transform.right; x += w * 0.005) {
        let p = transformPoint(transform, {x: x, y: f.evaluate(x)});
        ctx.lineTo(p.x, p.y);
    }

    ctx.stroke();
}

function transformPoint(transform, point) {
    const w = transform.right - transform.left;
    const h = transform.top - transform.bottom;
    const dx = point.x - transform.left;
    const dy = point.y - transform.bottom;
    
    const rx = dx / w;
    const ry = dy / h;

    let x = rx * canvas.width;
    let y = canvas.height - ry * canvas.height;

    return { x, y };
}

function createTransform() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // calculate camera height
    const aspectRatio = width / height;
    cameraHeight = cameraWidth / aspectRatio;

    // calculate parameters for orthographic projection matrix
    const hCameraWidth = cameraWidth / 2;
    const hCameraHeight = cameraHeight / 2;

    return {
        left: cameraX - hCameraWidth,
        right: cameraX + hCameraWidth,
        top: cameraY + hCameraHeight,
        bottom: cameraY - hCameraHeight
    };
}

function undoTransformation(point) {
    const transform = createTransform();
    let rx = point.x / canvas.width;
    let ry = (canvas.height - point.y) / canvas.height;
    const w = transform.right - transform.left;
    const h = transform.top - transform.bottom;
    let x = transform.left + w * rx;
    let y = transform.bottom + h * ry;
    return { x, y };
}

function draw() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    
    const transform = createTransform();
    const origin = transformPoint(transform, {x: 0, y: 0});

    // calculate interval of axis markers
    let numDigitsX = Math.floor(Math.log(cameraWidth) / Math.log(10));
    let axisDigitsX = numDigitsX - 1; //  atleast 10 markers in total on the x-axis 
    let inc = Math.pow(10, axisDigitsX);

    ctx.font = "15px Comic Sans MS";
    ctx.fillStyle = "rgb(0, 0, 0)";
    // round left and bottom side to nearest marker
    const halfMarkerSize = 8;
    let bottomStart = Math.round(transform.bottom / inc) * inc;
    let leftStart = Math.round(transform.left / inc) * inc;
    for(let x = leftStart; x < transform.right; x += inc) {
        ctx.beginPath();
        const p = transformPoint(transform, {x: x, y: 0});
        ctx.strokeStyle = "rgb(200, 200, 200)";
        ctx.moveTo(p.x, origin.y - halfMarkerSize);
        ctx.lineTo(p.x, origin.y + halfMarkerSize);
        ctx.stroke();

        ctx.strokeStyle = "rgb(200, 200, 200)";
        ctx.beginPath();
        ctx.moveTo(p.x, 0);
        ctx.lineTo(p.x, height);
        ctx.stroke();

        ctx.fillText("" + x.toFixed(2), p.x, p.y + halfMarkerSize * 2);        
    }

    for(let y = bottomStart; y < transform.top; y += inc) {
        const p = transformPoint(transform, {x: 0, y: y});
        ctx.beginPath();
        ctx.strokeStyle = "rgb(200, 200, 200)";
        ctx.moveTo(origin.x - halfMarkerSize, p.y);
        ctx.lineTo(origin.x + halfMarkerSize, p.y);
        ctx.stroke();
        ctx.strokeStyle = "rgb(200, 200, 200)";
        ctx.moveTo(0, p.y);
        ctx.lineTo(width, p.y);
        ctx.stroke();

        ctx.fillText("" + y.toFixed(2), origin.x - halfMarkerSize * 6, p.y);
    }
    
    // draw axis
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(51, 51, 51)";
    ctx.beginPath();
    ctx.moveTo(origin.x, height);
    ctx.lineTo(origin.x, 0);
    ctx.moveTo(0, origin.y);
    ctx.lineTo(width, origin.y);
    ctx.stroke();

    drawFunc(ctx, transform, f);
}

function funcChanged() {
    let expr = document.getElementById("expression").value;
    f = new Expression(expr);
    draw();
}

canvas.addEventListener("wheel", (event) => {
    // scroll event
    let scale;
    if(event.deltaY > 0)
        scale = 1.1;
    else
        scale = 0.9;
    cameraWidth *= scale;
    draw();
});


canvas.addEventListener("mousemove", (event) => {
    // mouse move
    const mouseX = event.x;
    const mouseY = event.y;
    const dirX = event.movementX;
    const dirY = event.movementY;
    const worldPos = undoTransformation({x: mouseX, y: mouseY});

    if(mouseDown) {
        // Dragged
        const newWorldPos = undoTransformation({x: mouseX + dirX, y: mouseY + dirY});
        cameraX -= newWorldPos.x - worldPos.x;
        cameraY -= newWorldPos.y - worldPos.y;
        draw();
    }
});


canvas.addEventListener("mousedown", () => {
    mouseDown = true;
});

canvas.addEventListener("mouseup", () => {
    mouseDown = false;
});

new ResizeObserver(draw).observe(canvas);
draw();
