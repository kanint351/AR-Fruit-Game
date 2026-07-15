import { WORDS } from "../data/words.js";

export default class Fruit {

    constructor(canvas) {

        this.canvas = canvas;
        this.size = 64;

        this.dragging = false;

        this.floatOffset = Math.random() * Math.PI * 2;
        this.floatTime = 0;

        this.reset();

    }

    reset() {

        const item =
            WORDS[Math.floor(Math.random() * WORDS.length)];

        this.word = item.word;
        this.correct = item.correct;
        this.emoji = item.emoji;

        this.x =
            Math.random() * (this.canvas.width - 200) + 80;

        this.y =
            -Math.random() * 500 - 50;

        this.speed =
            2 + Math.random() * 2;

        this.floatTime = 0;
        this.floatOffset = Math.random() * Math.PI * 2;

    }

    update() {

        if (!this.dragging) {

            this.y += this.speed;
            this.floatTime += 0.08;
            this.glow = Math.sin(this.floatTime * 3) * 8;

            if (this.y > this.canvas.height) {
                this.reset();
            }

        }

    }

    isInside(px, py) {

        return (

            px >= this.x &&
            px <= this.x + this.size &&

            py >= this.y &&
            py <= this.y + this.size

        );

    }

    draw(ctx) {

        const floatY =
            Math.sin(this.floatTime + this.floatOffset) * 8;
            ctx.save();

if (this.dragging) {

    ctx.shadowColor = "#FFD700";
    ctx.shadowBlur = this.glow + 20;

} else {

    ctx.shadowColor = "#FFFFFF";
    ctx.shadowBlur = this.glow;

}

        // Emoji
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = "center";

        ctx.fillText(
            this.emoji,
            this.x + this.size / 2,
            this.y + floatY + 50
        );

        // คำ
        ctx.fillStyle = "#222";
        ctx.font = "bold 22px Arial";

        ctx.fillText(
            this.word,
            this.x + this.size / 2,
            this.y + floatY + 86
        );

        ctx.textAlign = "left";
        ctx.restore();

    }

}