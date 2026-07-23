export default class Timer {

    constructor(game, seconds) {

        this.game = game;

        this.time = seconds;
        this.max = seconds;

        this.running = false;

        this.lastTime = 0;

    }

    reset(seconds = this.max) {

        this.time = seconds;
        this.running = false;

    }

    start() {

        this.running = true;
        this.lastTime = performance.now();

    }

    stop() {

        this.running = false;

    }

    update() {

        if (!this.running) return;

        const now = performance.now();

        if (now - this.lastTime >= 1000) {

            this.time--;

            this.lastTime += 1000;

        }

    }

    isFinished() {

        return this.time <= 0;

    }

    draw(ctx) {

    const g = this.game;

    //----------------------------------
    // Responsive
    //----------------------------------

    const margin = Math.max(
        18,
        g.width * 0.02
    );

    const panelW = Math.min(
        320,
        g.width * 0.23
    );

    const panelH = Math.max(
        90,
        g.height * 0.11
    );

    const x =
        g.width -
        panelW -
        margin;

    const y = margin;

    //----------------------------------
    // สีตามเวลา
    //----------------------------------

    let border = "#42A5F5";
    let bg = "rgba(255,255,255,.95)";

    if (this.time <= 20) {

        border = "#FF9800";

    }

    if (this.time <= 10) {

        border = "#F44336";
        bg = "#FFEBEE";

    }

    //----------------------------------
    // Card
    //----------------------------------

    ctx.save();

    ctx.shadowColor = "rgba(0,0,0,.18)";
    ctx.shadowBlur = 16;

    ctx.fillStyle = bg;

    ctx.beginPath();

    ctx.roundRect(
        x,
        y,
        panelW,
        panelH,
        22
    );

    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.lineWidth = 3;

    ctx.strokeStyle = border;

    ctx.stroke();

    //----------------------------------
    // Pulse ตอนเหลือ 10 วิ
    //----------------------------------

    let scale = 1;

    if (this.time <= 10) {

        scale =
            1 +
            Math.sin(
                performance.now() / 120
            ) * 0.08;

    }

    //----------------------------------
    // Icon
    //----------------------------------

    const iconSize = Math.max(
        30,
        Math.min(
            g.width * 0.03,
            44
        )
    );

    //----------------------------------
    // Text
    //----------------------------------

    const textSize = Math.max(
        24,
        Math.min(
            g.width * 0.028,
            40
        )
    );

    ctx.font = `${iconSize}px Arial`;

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    ctx.fillText(
        "⏰",
        x + 22,
        y + panelH / 2
    );

    //----------------------------------
    // เวลา
    //----------------------------------

    ctx.save();

    ctx.translate(
        x + panelW - 26,
        y + panelH / 2
    );

    ctx.scale(
        scale,
        scale
    );

    ctx.fillStyle =
        this.time <= 10
            ? "#D32F2F"
            : "#222";

    ctx.font =
        `bold ${textSize}px Arial`;

    ctx.textAlign = "right";

    ctx.fillText(
        `${this.time} วิ`,
        0,
        0
    );

    ctx.restore();

    //----------------------------------
    // กระพริบกรอบ
    //----------------------------------

    if (this.time <= 10) {

        ctx.strokeStyle =
            `rgba(244,67,54,${
                0.2 +
                Math.abs(
                    Math.sin(
                        performance.now()/120
                    )
                ) * .5
            })`;

        ctx.lineWidth = 6;

        ctx.beginPath();

        ctx.roundRect(
            x - 3,
            y - 3,
            panelW + 6,
            panelH + 6,
            24
        );

        ctx.stroke();

    }

    ctx.restore();

}

}