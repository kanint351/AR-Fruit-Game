export default class Timer {

    constructor(seconds = 60) {

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
            window.innerWidth * 0.02
        );

        const fontSize = Math.max(
            24,
            Math.min(
                window.innerWidth * 0.03,
                42
            )
        );

        const boxWidth = Math.max(
            220,
            window.innerWidth * 0.18
        );

        const boxHeight = this.time <= 10
        ? fontSize + 60
        : fontSize + 26;

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

            window.innerWidth - boxWidth - margin,

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

            window.innerWidth -
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
    window.innerWidth - boxWidth / 2 - margin,
    margin + fontSize + 30
);

        }

        ctx.restore();

    }

}