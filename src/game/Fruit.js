import {WORDS} from "../data/words.js";

export default class Fruit {

    constructor(game) {
        this.active = false;

        this.game = game;

        this.size = 80;

        this.dragging = false;

        this.rotation = 0;

        this.floatTime = Math.random() * Math.PI * 2;

        this.floatOffset = Math.random() * Math.PI * 2;

        this.glow = 10;
        this.x = -200;
        this.y = -200;

        this.correct = false;
        this.word = "";
        this.emoji = "";
        

    }

    //-----------------------------------
    // สุ่มผลไม้ใหม่
    //-----------------------------------

    reset() {

        const item =
            WORDS[
                Math.floor(
                    Math.random() * WORDS.length
                )
            ];

        this.word = item.word;
        this.emoji = item.emoji;
        this.correct = item.correct;
        this.dragging = false;

this.floatTime = Math.random() * Math.PI * 2;

this.floatOffset = Math.random() * Math.PI * 2;
this.speed = 2 + Math.random() * 2;

        const margin = 100;

if (this.game.fruits) {

    let ok = false;

    while (!ok) {

        ok = true;

        this.x =
            margin +
            Math.random() *
            (this.game.width - margin * 2 - this.size);

        this.y =
            120 +
            Math.random() * 220;

        for (const fruit of this.game.fruits) {

            if (fruit === this) continue;

            const dx = this.x - fruit.x;
            const dy = this.y - fruit.y;

            if (Math.sqrt(dx * dx + dy * dy) < 120) {

                ok = false;
                break;

            }

        }

    }

} else {

    this.x =
        margin +
        Math.random() *
        (this.game.width - margin * 2 - this.size);

    this.y =
        120 +
        Math.random() * 220;

}

this.rotation =
    (Math.random() - 0.5) * 0.4;

    }

    //-----------------------------------
    // ตรวจว่าคลิกโดนไหม
    //-----------------------------------

    isInside(x, y) {

        return (

            x >= this.x &&
            x <= this.x + this.size &&
            y >= this.y &&
            y <= this.y + this.size

        );

    }

    //-----------------------------------
    // Update
    //-----------------------------------

    update() {
        if (!this.active) return;
        // ลอยเบา ๆ
    this.floatTime += 0.05;

    // ถ้าไม่ได้ถูกลาก ให้ตกลงมา
    if (!this.dragging) {

        this.y += this.speed;

    }

    // หลุดจอด้านล่าง
    if (this.y > this.game.height + this.size) {

        this.active = false;

    }



    }
        //-----------------------------------
    // Draw
    //-----------------------------------

    draw(ctx) {
        if (!this.active) return;

        const floatY =
            Math.sin(
                this.floatTime +
                this.floatOffset
            ) * 8;

        //---------------------------------
        // วาดผลไม้
        //---------------------------------

        ctx.save();

        ctx.translate(
            this.x + this.size / 2,
            this.y + this.size / 2 + floatY
        );

        ctx.rotate(this.rotation);

        if (this.dragging) {

            ctx.shadowColor = "#FFD700";
            ctx.shadowBlur = 28;

        } else {

            ctx.shadowColor = "#FFFFFF";
            ctx.shadowBlur = this.glow;

        }

        ctx.font = `${this.size}px Arial`;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            this.emoji,
            0,
            0
        );

        ctx.restore();

        //---------------------------------
        // วาดข้อความ (ไม่หมุน)
        //---------------------------------

        ctx.save();

        ctx.shadowBlur = 0;

        ctx.fillStyle = "#222";

        const textSize = Math.max(
            18,
            Math.min(
                this.size * 0.34,
                28
            )
        );

        ctx.font =
            `bold ${textSize}px Arial`;

        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        ctx.fillText(

            this.word,

            this.x + this.size / 2,

            this.y +
            this.size +
            floatY +
            8

        );

        ctx.restore();

    }

}