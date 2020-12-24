class Body {
    constructor(pos, mass, color, vel) {
        this.pos = pos;
        this.mass = mass;
        this.vel = vel;
        this.r = mass*2;
        this.color = color;
    }

    update() {
        this.pos.x += this.vel.x * time_steps;
        this.pos.y += this.vel.y * time_steps;
    }

    applyForce(f) {
        this.vel.add(f);
    }

    applyForce(fx, fy) {
        this.vel.add(fx, fy);
    }
}