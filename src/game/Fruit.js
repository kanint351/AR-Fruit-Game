import { WORDS } from "../data/words.js";
import Images from "./Images.js";

export default class Fruit {

    constructor(game) {

        this.game = game;

        this.active = false;
        this.dragging = false;

        this.word = "";
        this.correct = false;
        this.image = null;

        this.slot = null;

        this.rotation = 0;

        this.floatTime = Math.random() * Math.PI * 2;
        this.floatOffset = Math.random() * Math.PI * 2;

        this.glow = 10;
        this.speed = 1;

        this.size = Math.max(
            60,
            Math.min(
                this.game.width * 0.07,
                100
            )
        );

        this.x = -200;
        this.y = -200;

        this.scale = 0;

    }

    //----------------------------------
    // รีเซ็ตผลไม้
    //----------------------------------

    reset() {

        const item =
            WORDS[
                Math.floor(
                    Math.random() *
                    WORDS.length
                )
            ];

        this.word = item.word;
        this.correct = item.correct;
        this.image = Images[item.image];

        this.dragging = false;

        this.slot = null;

        this.floatTime =
            Math.random() *
            Math.PI *
            2;

        this.floatOffset =
            Math.random() *
            Math.PI *
            2;

        this.speed =
            this.game.height * 0.0015 +
            Math.random() * 0.5;

        this.rotation =
            (Math.random() - 0.5) * 0.35;

        this.size = Math.max(
            60,
            Math.min(
                this.game.width * 0.07,
                100
            )
        );

        this.scale = 0;

    }

    //----------------------------------
    // ตรวจว่าคลิกโดนไหม
    //----------------------------------

    isInside(x, y) {

        return (

            x >= this.x &&
            x <= this.x + this.size &&
            y >= this.y &&
            y <= this.y + this.size

        );

    }

    //----------------------------------
    // Update
    //----------------------------------

    update() {

        if (!this.active) return;

        if (this.scale < 1) {

            this.scale += 0.08;

        }

        this.floatTime += 0.05;

        if (!this.dragging) {

            this.y += this.speed;

        }

        if (this.y > this.game.height + this.size) {

            this.active = false;

            this.releaseSlot();

        }

    }

    //----------------------------------
    // คืน Slot
    //----------------------------------

    releaseSlot() {

        if (this.slot) {

            this.slot.fruit = null;
            this.slot = null;

        }

    }

    //----------------------------------
    // Draw
    //----------------------------------

    draw(ctx) {

        if (!this.active) return;

        const floatY =
            Math.sin(
                this.floatTime +
                this.floatOffset
            ) * 8;

        ctx.save();

        ctx.translate(

            this.x + this.size / 2,

            this.y + floatY + this.size / 2

        );

        ctx.scale(

            this.scale,

            this.scale

        );

        ctx.rotate(this.rotation);

        if (this.dragging) {

            ctx.shadowColor = "#FFD700";
            ctx.shadowBlur = 28;

        } else {

            ctx.shadowColor = "#FFFFFF";
            ctx.shadowBlur = this.glow;

        }

        if (this.image?.complete) {

            ctx.drawImage(

                this.image,

                -this.size / 2,

                -this.size / 2,

                this.size,

                this.size

            );

        }

        ctx.restore();

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

        ctx.font = `bold ${textSize}px Arial`;

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