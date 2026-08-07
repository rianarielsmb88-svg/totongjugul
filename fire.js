const canvas = document.getElementById("fire");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

const flames = [];
const embers = [];

class Flame {

    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 40;

        this.size = 25 + Math.random() * 35;

        this.speedY = 1 + Math.random() * 2;
        this.speedX = (Math.random() - .5) * .4;

        this.life = 80 + Math.random() * 40;
        this.maxLife = this.life;
    }

    update() {

        this.life--;

        this.y -= this.speedY;
        this.x += this.speedX;

        this.size *= .988;

        if (this.life <= 0 || this.size < 2) {
            this.reset();
        }

    }

    draw() {

        const a = this.life / this.maxLife;

        const g = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size
        );

        g.addColorStop(0, `rgba(255,255,220,${a})`);
        g.addColorStop(.2, `rgba(255,220,80,${a})`);
        g.addColorStop(.5, `rgba(255,120,0,${a*.8})`);
        g.addColorStop(.8, `rgba(255,40,0,${a*.3})`);
        g.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = g;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

    }

}

class Ember {

    constructor() {
        this.reset();
    }

    reset() {

        this.x = Math.random() * canvas.width;
        this.y = canvas.height;

        this.size = 1 + Math.random() * 2;

        this.speedY = 2 + Math.random() * 3;
        this.speedX = (Math.random() - .5) * 1.5;

        this.life = 100 + Math.random() * 40;
        this.maxLife = this.life;

    }

    update() {

        this.life--;

        this.x += this.speedX;
        this.y -= this.speedY;

        if (this.life <= 0 || this.y < -20) {
            this.reset();
        }

    }

    draw() {

        const a = this.life / this.maxLife;

        ctx.beginPath();

        ctx.fillStyle = `rgba(255,180,30,${a})`;

        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ff9900";

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}

for(let i=0;i<80;i++){

    flames.push(new Flame());

}

for(let i=0;i<120;i++){

    embers.push(new Ember());

}

function drawGroundGlow(){

    const g = ctx.createRadialGradient(
        canvas.width/2,
        canvas.height,
        10,
        canvas.width/2,
        canvas.height,
        canvas.width*.7
    );

    g.addColorStop(0,"rgba(255,140,0,.45)");
    g.addColorStop(.4,"rgba(255,80,0,.18)");
    g.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle = g;

 

}

function animate(){

    requestAnimationFrame(animate);

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawGroundGlow();

    ctx.globalCompositeOperation="lighter";

    flames.forEach(f=>{

        f.update();
        f.draw();

    });

    embers.forEach(e=>{

        e.update();
        e.draw();

    });

    ctx.globalCompositeOperation="source-over";

}

animate();