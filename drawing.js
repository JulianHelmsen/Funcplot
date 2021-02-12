const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let mouseDown = false;

let zoomLevel = 1;
let cameraWidth = 20;
let cameraHeight;
let cameraX = 0;
let cameraY = 0;
let projectionMatrix = new Array(4 * 4);

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
        left: cameraX - hCameraWidth * zoomLevel,
        right: cameraX + hCameraWidth * zoomLevel,
        top: cameraY + hCameraHeight * zoomLevel,
        bottom: cameraY - hCameraHeight * zoomLevel
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

    // draw axis
    ctx.lineWidth = 4;
    ctx.fillStyle = "rgb(51, 255, 51)";
    ctx.moveTo(origin.x, height);
    ctx.lineTo(origin.x, 0);
    ctx.moveTo(0, origin.y);
    ctx.lineTo(width, origin.y);
    ctx.stroke();

}

canvas.addEventListener("wheel", (event) => {
    // scroll event
    let scale;
    if(event.deltaY > 0)
        scale = 1.1;
    else
        scale = 0.9;
    zoomLevel *= scale;
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
