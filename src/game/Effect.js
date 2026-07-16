export default class Effect {

    constructor(x, y, color = "#FFD54F") {

        this.x = x;
        this.y = y;

        this.color = color;

        this.life = 1;

        this.size =
            6 + Math.random() * 10;

        this.speedX =
            (Math.random() - 0.5) * 8;

        this.speedY =
            -2 - Math.random() * 6;

        this.gravity = 0.18;

        this.rotation =
            Math.random() * Math.PI * 2;

        this.rotateSpeed =
            (Math.random() - 0.5) * 0.25;

    }

    update() {

        this.x += this.speedX;

        this.y += this.speedY;

        this.speedY += this.gravity;

        this.rotation += this.rotateSpeed;

        this.life -= 0.02;

    }

    draw(ctx) {

        if (this.life <= 0) return;

        ctx.save();

        ctx.globalAlpha = this.life;

        ctx.translate(
            this.x,
            this.y
        );

        ctx.rotate(
            this.rotation
        );

        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;

        ctx.fillStyle = this.color;

        ctx.beginPath();

        for (let i = 0; i < 5; i++) {

            const angle =
                (Math.PI * 2 / 5) * i;

            const r =
                i % 2 === 0
                    ? this.size
                    : this.size * 0.45;

            const px =
                Math.cos(angle) * r;

            const py =
                Math.sin(angle) * r;

            if (i === 0) {

                ctx.moveTo(px, py);

            } else {

                ctx.lineTo(px, py);

            }

        }

        ctx.closePath();

        ctx.fill();

        ctx.restore();

    }

    get dead() {

        return this.life <= 0;

    }

}