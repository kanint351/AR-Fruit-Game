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
            this.game.width * 0.28,
            330
        );

        const boxHeight = 90;

        ctx.save();

        ctx.shadowColor = "rgba(0,0,0,.25)";
        ctx.shadowBlur = 12;

        const bg = ctx.createLinearGradient(
            margin,
            margin,
            margin,
            margin + boxHeight
        );

        bg.addColorStop(0, "#FFFFFF");
        bg.addColorStop(1, "#F2FFF2");

        ctx.fillStyle = bg;

        ctx.beginPath();

        ctx.roundRect(
            margin,
            margin,
            boxWidth,
            boxHeight,
            16
        );

        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#2ECC71";
        ctx.stroke();

        //-----------------------
        // คะแนน
        //-----------------------

        this.scoreScale +=
            (1 - this.scoreScale) * 0.15;

        ctx.translate(
            margin + boxWidth / 2,
            margin + boxHeight / 2
        );

        ctx.scale(
            this.scoreScale,
            this.scoreScale
        );

        ctx.translate(
            -(margin + boxWidth / 2),
            -(margin + boxHeight / 2)
        );

        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = "#222";
        ctx.textAlign = "left";

        ctx.fillText(
            `⭐ คะแนน ${this.value}`,
            margin + 18,
            margin + 42
        );

        //-----------------------
        // Combo
        //-----------------------

        ctx.font = `bold ${fontSize * 0.7}px Arial`;
        ctx.fillStyle = "#FF9800";

        ctx.fillText(
            `🔥 x${this.combo}`,
            margin + boxWidth - 90,
            margin + 74
        );

        ctx.restore();

        //-----------------------
        // High Score
        //-----------------------

        ctx.save();

        ctx.font = `bold ${fontSize * 0.6}px Arial`;
        ctx.fillStyle = "#666";
        ctx.textAlign = "left";

        const heartY = margin + 105;
        ctx.fillText(
            `🏆 สูงสุด ${this.highScore}`,
            margin + 18,
            margin + boxHeight + 78
        );

        ctx.restore();

    }

}