export default class Score {

    constructor(game) {

        this.game = game;

        this.value = 0;
        this.correct = 0;
        this.wrong = 0;

        this.combo = 0;
        this.maxCombo = 0;

        this.highScore =
            Number(localStorage.getItem("highScore")) || 0;

        this.scoreScale = 1;

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

        this.saveHighScore();

        this.scoreScale = 1.15;

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

    const g = this.game;

    const panelW = Math.min(
        g.width * 0.24,
        340
    );

    const panelH = Math.max(
        170,
        g.height * 0.20
    );

    const margin = Math.max(
        18,
        g.width * 0.02
    );

    const radius = 22;

    ctx.save();

    // Shadow
    ctx.shadowColor = "rgba(0,0,0,.18)";
    ctx.shadowBlur = 16;

    // Background
    ctx.fillStyle = "rgba(255,255,255,.95)";

    ctx.beginPath();

    ctx.roundRect(
        margin,
        margin,
        panelW,
        panelH,
        radius
    );

    ctx.fill();

    // Border
    ctx.shadowBlur = 0;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#66BB6A";
    ctx.stroke();

    //------------------------------------

    const left = margin + 22;

    const valueX =
        margin +
        panelW -
        22;

    const line =
        panelH / 4.8;

    let y =
        margin + line;

    const font = Math.max(
        22,
        Math.min(
            g.width * 0.022,
            34
        )
    );

    ctx.font = `bold ${font}px Arial`;
    ctx.fillStyle = "#222";

    ctx.textAlign = "left";

    ctx.fillText(
        "⭐ คะแนน",
        left,
        y
    );

    ctx.textAlign = "right";

    ctx.fillText(
        this.value,
        valueX,
        y
    );

    //------------------------------------

    y += line;

    ctx.textAlign = "left";

    ctx.fillStyle = "#FF9800";

    ctx.fillText(
        "🔥 Combo",
        left,
        y
    );

    ctx.textAlign = "right";

    ctx.fillText(
        "x" + this.combo,
        valueX,
        y
    );

    //------------------------------------

    y += line;

    ctx.textAlign = "left";

    let hearts = "";

    for (let i = 0; i < g.lives.max; i++) {

        hearts +=
            i < g.lives.value
                ? "❤️ "
                : "🤍 ";

    }

    ctx.fillStyle = "#000";

    ctx.fillText(
        hearts,
        left,
        y
    );

    //------------------------------------

    y += line;

    ctx.fillStyle = "#666";

    ctx.fillText(
        "🏆 สูงสุด " + this.highScore,
        left,
        y
    );

    ctx.restore();

}

}