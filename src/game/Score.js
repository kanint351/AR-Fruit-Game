export default class Score {

    constructor() {
    this.value = 0;

    this.correct = 0;

    this.wrong = 0;

        

        this.best = Number(
            localStorage.getItem("bestScore") || 0
        );

    }

    add(point = 1) {

        this.value += point;

        if (this.value > this.best) {

            this.best = this.value;

            localStorage.setItem(
                "bestScore",
                this.best
            );

        }

    }

    reset() {

        this.value = 0;
        

        this.correct = 0;

        this.wrong = 0;

    }
    add() {

    this.value++;

    this.correct++;

}

miss() {

    this.wrong++;

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

        const boxHeight = fontSize + 26;

        // Shadow
        ctx.save();

        ctx.shadowColor = "rgba(0,0,0,.3)";
        ctx.shadowBlur = 12;

        // Background
        ctx.fillStyle = "rgba(255,255,255,.85)";

        ctx.beginPath();

        ctx.roundRect(
            margin,
            margin,
            boxWidth,
            boxHeight,
            14
        );

        ctx.fill();

        // Border
        ctx.shadowBlur = 0;

        ctx.lineWidth = 2;

        ctx.strokeStyle = "#2ECC71";

        ctx.stroke();

        // Text
        ctx.fillStyle = "#222";

        ctx.font = `bold ${fontSize}px Arial`;

        ctx.textAlign = "left";

        ctx.fillText(

            `⭐ คะแนน ${this.value}`,

            margin + 18,

            margin + fontSize + 6

        );

        ctx.restore();

    }

}