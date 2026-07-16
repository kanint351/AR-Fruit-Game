export default class Score {

    constructor(game) {
    this.game = game;
    this.value = 0;

    this.correct = 0;

    this.wrong = 0;
    this.combo = 0;
    this.maxCombo = 0;

        

        this.highScore =
    Number(
        localStorage.getItem("highScore")
    ) || 0;
        

    }

    add(point = 1) {

    this.value += point;

    this.correct++;

}

    reset() {

        this.value = 0;
        

        this.correct = 0;

        this.wrong = 0;
        this.combo = 0;
        this.maxCombo = 0;

    }
    add(point = 1) {

    this.combo++;

    if (this.combo > this.maxCombo) {

        this.maxCombo = this.combo;

    }

    if (this.combo >= 10) {

        point = 5;

    } else if (this.combo >= 5) {

        point = 3;

    } else if (this.combo >= 3) {

        point = 2;

    }

    this.value += point;

    this.correct++;

}

miss() {

    this.combo = 0;

    this.wrong++;

    

}
saveHighScore() {

    if (this.value > this.highScore) {

        this.highScore = this.value;

        localStorage.setItem(
            "highScore",
            this.highScore
        );

    }

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