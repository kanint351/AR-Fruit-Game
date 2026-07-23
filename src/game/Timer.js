export default class Timer {

    constructor(game, seconds = 60) {

        this.game = game;

        this.time = seconds;

        this.running = false;

        this.lastTick = 0;

    }

    //----------------------------------
    // Reset
    //----------------------------------

    reset(seconds = 60) {

        this.time = seconds;

        this.running = false;

        this.lastTick = performance.now();

    }

    //----------------------------------
    // Start
    //----------------------------------

    start() {

        this.running = true;

        this.lastTick = performance.now();

    }

    //----------------------------------
    // Stop
    //----------------------------------

    stop() {

        this.running = false;

    }

    //----------------------------------
    // Update
    //----------------------------------

    update() {

        if (!this.running) return;

        const now = performance.now();

        if (now - this.lastTick >= 1000) {

            this.time--;

            this.lastTick += 1000;

            if (this.time <= 0) {

                this.time = 0;

                this.stop();

            }

        }

    }

    //----------------------------------
    // Finished ?
    //----------------------------------

    isFinished() {

        return this.time <= 0;

    }

    //----------------------------------
    // Draw
    //----------------------------------

    draw(ctx) {

        const r = this.game.renderer;

        const panelW = r.ui(260);

        const panelH = r.ui(90);

        const x =
            this.game.width -
            panelW -
            r.ui(18);

        const y = r.ui(18);

        const danger = this.time <= 10;

        //----------------------------------
        // Card
        //----------------------------------

        r.drawCard(

            ctx,

            x,

            y,

            panelW,

            panelH,

            danger
                ? "#F44336"
                : "#2196F3",

            danger
                ? "rgba(255,235,238,.95)"
                : "rgba(255,255,255,.95)"

        );

        //----------------------------------
        // Text
        //----------------------------------

        ctx.save();

        ctx.fillStyle =
            danger
                ? "#D32F2F"
                : "#222";

        ctx.font =
            `bold ${r.ui(28)}px Arial`;

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";

        ctx.fillText(

            `⏰ ${this.time} วิ`,

            x + panelW / 2,

            y + panelH / 2

        );

        ctx.restore();

    }

}