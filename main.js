let
canvas, ctx, 
width = 800, height = 800,

G = 6.67408*10^-11;

bodies = []

body_fucus = 0, offsetX = 0, offsetY = 0
time_steps = 1;

function start() {
    init();

    let ex = 120, ey = 200;

    // Sun
    bodies.push(new Body(new Vector2(400, 200), 7, {r: 255, g: 0, b: 0}, new Vector2(0, 0)));

    // Moon
    //bodies.push(new Body(new Vector2(ex-100, ey), 0.5, {r: 0, g: 0, b: 255}, new Vector2(.5, 0)));
    
    //Earth
    bodies.push(new Body(new Vector2(ex, ey), 2,{r: 0, g: 255, b: 0}, new Vector2(0, 2.5)));

    //Random planet
    bodies.push(new Body(new Vector2(440, 200), 2,{r: 255, g: 255, b: 0}, new Vector2(0, 4)));

    window.requestAnimationFrame(loop);
}

function init() {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
}

function loop() {
    update();
    render();
    window.requestAnimationFrame(loop);
}

function update() {
    for(i = 0; i < bodies.length; i++) {
        for(j = 0; j < bodies.length; j++) {
            if(i == j) continue;
            const b0 = bodies[i];
            const b1 = bodies[j];

            const r = Math.abs(Vector2.dist(b0.pos, b1.pos));
            const F = (G * b0.mass * b1.mass / (r*r))/b0.mass;        
            const b0_a = Vector2.a(b1.pos, b0.pos);

            b0.applyForce(F*Math.cos(b0_a)*time_steps, F*Math.sin(b0_a)*time_steps);
        }
    }
    
    for(i = 0; i < bodies.length; i++) {
        bodies[i].update(time_steps);
    }

    offsetX = -bodies[body_fucus].pos.x + width/2;
    offsetY = -bodies[body_fucus].pos.y + height/2;
}

function render() {
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, width, height);
    for(i = 0; i < bodies.length; i++) {
        renderBody(bodies[i]);
    }
}

function keydown(e) {
}

function keyup(e) {
    if(e.keyCode == 37) {
        body_fucus++;
        if(body_fucus >= bodies.length) body_fucus = 0;
    }

    if(e.keyCode == 39) {
        body_fucus--;
        if(body_fucus < 0) body_fucus = bodies.length-1;
    }
}

function renderBody(body) {
    ctx.fillStyle = color(body.color.r, body.color.g, body.color.b);
    renderCircle(ctx, body.pos, body.r, true);
}

function renderCircle(ctx, p, r, fill) {
    ctx.beginPath();
    ctx.arc(p.x + offsetX, p.y + offsetY, r, 0, 2 * Math.PI);
    if(fill) ctx.fill();
    else ctx.stroke();
}

function radians_to_degrees(radians) {
  var pi = Math.PI;
  return radians * (180/pi);
}

function color(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

window.onload = function() {
    start();
}