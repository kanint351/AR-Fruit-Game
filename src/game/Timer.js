export default class Timer {

    constructor(game, seconds = 60) {

    this.game = game;

    this.startTime = seconds;

    this.time = seconds;

    this.running = false;

    this.lastTick = 0;

}

    start() {

        this.running = true;

        this.lastTick = performance.now();

    }

    stop() {

        this.running = false;

    }

    reset(seconds = this.startTime) {

        this.startTime = seconds;

        this.time = seconds;

        this.running = false;

    }

    update() {

        if (!this.running) return;

        const now = performance.now();

        if (now - this.lastTick >= 1000) {

            this.lastTick += 1000;

            if (this.time > 0) {

                this.time--;

            }

        }

    }

    isFinished() {

        return this.time <= 0;

    }

    draw(ctx) {

        const margin = Math.max(
            20,
            this.game.width * 0.02
        );

        const fontSize = Math.max(
            24,
            Math.min(
                this.game.width * 0.03,
                42
            )
        );

        const boxWidth = Math.min(

    320,

    Math.max(

        180,

        this.game.width * 0.22

    )

);

        const boxHeight = Math.max(

    54,

    fontSize + 24

);

        ctx.save();

        ctx.shadowColor = "rgba(0,0,0,.3)";
        ctx.shadowBlur = 12;

        //------------------------------------
        // สีพื้น
        //------------------------------------

        let bg = "rgba(255,255,255,.85)";
        let border = "#2196F3";

        if (this.time <= 10) {

            bg = "#FFEBEE";
            border = "#F44336";

        }

        ctx.fillStyle = bg;

        ctx.beginPath();

        ctx.roundRect(

            this.game.width - boxWidth - margin,

            margin,

            boxWidth,

            boxHeight,

            14

        );

        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.lineWidth = 2;

        ctx.strokeStyle = border;

        ctx.stroke();

        //------------------------------------
        // ตัวหนังสือ
        //------------------------------------

        ctx.fillStyle =
            this.time <= 10
                ? "#D32F2F"
                : "#222";

        ctx.font =
            `bold ${fontSize}px Arial`;

        ctx.textAlign = "left";

        ctx.fillText(

            `⏰ ${this.time} วินาที`,

            this.game.width -
            boxWidth -
            margin +
            18,

            margin +
            fontSize +
            6

        );

        //------------------------------------
        // เตือนเมื่อเหลือ 10 วิ
        //------------------------------------

        if (this.time <= 10) {

            ctx.font =
                `bold ${fontSize * 0.7}px Arial`;

            ctx.fillStyle = "#F44336";

            ctx.textAlign = "center";

ctx.font = `bold ${fontSize * 0.65}px Arial`;

ctx.textAlign = "center";

ctx.fillText(
    "รีบหน่อย!",
    this.game.width - boxWidth / 2 - margin,
    margin + fontSize + 30
);

        }

        ctx.restore();

    }

}