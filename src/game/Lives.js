export default class Lives {

    constructor(game) {

        this.game = game;

        this.max = 3;
        this.value = 3;

    }

    //---------------------------------
    // รีเซ็ตหัวใจ
    //---------------------------------

    reset() {

        this.value = this.max;

    }

    //---------------------------------
    // ลดหัวใจ
    //---------------------------------

    lose() {

        if (this.value > 0) {

            this.value--;

        }

    }

    //---------------------------------
    // ตรวจว่าหมดหัวใจหรือยัง
    //---------------------------------

    isDead() {

        return this.value <= 0;

    }

    //---------------------------------
    // วาดหัวใจ
    //---------------------------------

    draw(ctx) {

        const margin = Math.max(
            20,
            this.game.width * 0.02
        );

        const fontSize = Math.max(
            24,
            Math.min(
                this.game.width * 0.03,
                36
            )
        );

        // วาดใต้กล่องคะแนน
        const x = margin + 10;
        const y = margin + 110;

        ctx.save();

        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        for (let i = 0; i < this.max; i++) {

            ctx.fillStyle =
                i < this.value
                    ? "#E53935"
                    : "#D0D0D0";

            ctx.fillText(
                "❤",
                x + i * (fontSize + 8),
                y
            );

        }

        ctx.restore();

    }

}