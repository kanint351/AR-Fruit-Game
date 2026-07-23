export default class Renderer {

    constructor(game) {

        this.game = game;

    }

    //----------------------------------
    // Responsive Scale
    //----------------------------------

    ui(value) {

        const scale = Math.min(

            this.game.width / 1366,

            this.game.height / 768

        );

        return value * Math.max(scale, 0.55);

    }

    //----------------------------------
    // Universal Card
    //----------------------------------

    drawCard(
        ctx,
        x,
        y,
        w,
        h,
        border = "#66BB6A",
        bg = "rgba(255,255,255,.95)"
    ) {

        ctx.save();

        ctx.shadowColor = "rgba(0,0,0,.18)";
        ctx.shadowBlur = this.ui(16);

        ctx.fillStyle = bg;

        ctx.beginPath();

        ctx.roundRect(
            x,
            y,
            w,
            h,
            this.ui(22)
        );

        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.lineWidth = this.ui(3);

        ctx.strokeStyle = border;

        ctx.stroke();

        ctx.restore();

    }

    //----------------------------------
    // Render
    //----------------------------------

    render() {

        const g = this.game;
        const ctx = g.ctx;

        ctx.imageSmoothingEnabled = true;

        ctx.clearRect(
            0,
            0,
            g.width,
            g.height
        );

        if (!g.started) {

            this.drawStart();
            return;

        }

        if (g.gameOver) {

            this.drawGameOver();
            return;

        }

        this.drawGame();

    }

    //----------------------------------
    // Main Game
    //----------------------------------

    drawGame() {

        const g = this.game;
        const ctx = g.ctx;

        //----------------------------------
        // Sky
        //----------------------------------

        const sky = ctx.createLinearGradient(
            0,
            0,
            0,
            g.height
        );

        sky.addColorStop(0, "#7DD3FC");
        sky.addColorStop(.6, "#BAE6FD");
        sky.addColorStop(1, "#E0F7FF");

        ctx.fillStyle = sky;

        ctx.fillRect(
            0,
            0,
            g.width,
            g.height
        );

        //----------------------------------
        // Cloud
        //----------------------------------

        this.drawCloud(

            ctx,

            g.width * 0.5,

            this.ui(70),

            this.ui(32)

        );

        //----------------------------------
        // Grass
        //----------------------------------

        const grassHeight = this.ui(90);

        const grass = ctx.createLinearGradient(

            0,

            g.height - grassHeight,

            0,

            g.height

        );

        grass.addColorStop(0, "#7ED957");
        grass.addColorStop(1, "#43A047");

        ctx.fillStyle = grass;

        ctx.fillRect(

            0,

            g.height - grassHeight,

            g.width,

            grassHeight

        );

        //----------------------------------
        // Grass Line
        //----------------------------------

        ctx.strokeStyle = "#66BB6A";

        ctx.lineWidth = 2;

        for (

            let x = 0;

            x < g.width;

            x += 8

        ) {

            const h =
                Math.random() * 12 + 8;

            ctx.beginPath();

            ctx.moveTo(

                x,

                g.height -
                grassHeight +
                20

            );

            ctx.lineTo(

                x + 2,

                g.height -
                grassHeight +
                20 -
                h

            );

            ctx.stroke();

        }

        //----------------------------------
        // Basket
        //----------------------------------

        g.leftBasket.draw(ctx);

        g.rightBasket.draw(ctx);

        //----------------------------------
        // Fruits
        //----------------------------------

        for (const fruit of g.fruits) {

            if (fruit.active) {

                fruit.draw(ctx);

            }

        }

        //----------------------------------
        // Effects
        //----------------------------------

        for (const effect of g.effects) {

            effect.draw(ctx);

        }

        //----------------------------------
        // HUD
        //----------------------------------

        this.drawHUDCard(ctx);

        g.timer.draw(ctx);

        //----------------------------------
        // Combo
        //----------------------------------

        if (g.score.combo >= 3) {

            this.drawComboBanner(ctx);

        }

        }
            //----------------------------------
    // HUD Card
    //----------------------------------

    drawHUDCard(ctx) {

        const g = this.game;

        const cardW = this.ui(320);
        const cardH = this.ui(215);

        const x = this.ui(18);
        const y = this.ui(18);

        this.drawCard(
            ctx,
            x,
            y,
            cardW,
            cardH,
            "#66BB6A"
        );

        //----------------------------------

        const left = x + this.ui(22);
        const right = x + cardW - this.ui(22);

        const labelFont = this.ui(22);
        const valueFont = this.ui(24);

        const line = this.ui(42);

        let yy = y + this.ui(38);

        //----------------------------------
        // Score
        //----------------------------------

        ctx.save();

        ctx.textBaseline = "middle";

        ctx.font = `bold ${labelFont}px Arial`;

        ctx.fillStyle = "#222";

        ctx.textAlign = "left";

        ctx.fillText(
            "⭐ คะแนน",
            left,
            yy
        );

        ctx.textAlign = "right";

        ctx.font = `bold ${valueFont}px Arial`;

        ctx.fillText(
            g.score.value,
            right,
            yy
        );

        //----------------------------------
        // Combo
        //----------------------------------

        yy += line;

        ctx.textAlign = "left";

        ctx.font = `bold ${labelFont}px Arial`;

        ctx.fillStyle = "#FF9800";

        ctx.fillText(
            "🔥 Combo",
            left,
            yy
        );

        ctx.textAlign = "right";

        ctx.font = `bold ${valueFont}px Arial`;

        ctx.fillText(
            "x" + g.score.combo,
            right,
            yy
        );

        //----------------------------------
        // Hearts
        //----------------------------------

        yy += line;

        let hearts = "";

        for (let i = 0; i < g.lives.max; i++) {

            hearts +=
                i < g.lives.value
                    ? "❤️ "
                    : "🤍 ";

        }

        ctx.textAlign = "left";

        ctx.font = `${this.ui(26)}px Arial`;

        ctx.fillStyle = "#222";

        ctx.fillText(
            hearts,
            left,
            yy
        );

        //----------------------------------
        // High Score
        //----------------------------------

        yy += line;

        ctx.font = `${this.ui(18)}px Arial`;

        ctx.fillStyle = "#666";

        ctx.fillText(
            `🏆 สูงสุด ${g.score.highScore}`,
            left,
            yy
        );

        ctx.restore();

    }

    //----------------------------------
    // Combo Banner
    //----------------------------------

    drawComboBanner(ctx) {

        const g = this.game;

        let icon = "🔥";
        let title = "COMBO";
        let color = "#FFD54F";

        if (g.score.combo >= 10) {

            icon = "👑";
            title = "PERFECT";
            color = "#E91E63";

        }
        else if (g.score.combo >= 5) {

            icon = "⚡";
            title = "GREAT";
            color = "#FF9800";

        }

        const mobile = g.width < 700;

        const font = mobile
            ? this.ui(24)
            : this.ui(34);

        const x = g.width / 2;

        const y = mobile
            ? this.ui(140)
            : this.ui(95);

        const scale =
            1 +
            Math.sin(
                performance.now() / 150
            ) * 0.06;

        ctx.save();

        ctx.translate(x, y);

        ctx.scale(scale, scale);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = `bold ${font}px Arial`;

        ctx.lineWidth = this.ui(4);

        ctx.strokeStyle = "#FFFFFF";
        ctx.fillStyle = color;

        if (mobile) {

            ctx.strokeText(
                icon,
                0,
                -font
            );

            ctx.fillText(
                icon,
                0,
                -font
            );

            ctx.strokeText(
                title,
                0,
                0
            );

            ctx.fillText(
                title,
                0,
                0
            );

            ctx.strokeText(
                "x" + g.score.combo,
                0,
                font
            );

            ctx.fillText(
                "x" + g.score.combo,
                0,
                font
            );

        } else {

            const text =
                `${icon} ${title} x${g.score.combo}`;

            ctx.strokeText(
                text,
                0,
                0
            );

            ctx.fillText(
                text,
                0,
                0
            );

        }

        ctx.restore();

    }
        //----------------------------------
    // Start Screen
    //----------------------------------

    drawStart() {

        const g = this.game;
        const ctx = g.ctx;

        //----------------------------------
        // Background
        //----------------------------------

        const sky = ctx.createLinearGradient(
            0,
            0,
            0,
            g.height
        );

        sky.addColorStop(0, "#7DD3FC");
        sky.addColorStop(.6, "#BAE6FD");
        sky.addColorStop(1, "#E0F7FF");

        ctx.fillStyle = sky;
        ctx.fillRect(
            0,
            0,
            g.width,
            g.height
        );

        //----------------------------------
        // Cloud
        //----------------------------------

        this.drawCloud(
            ctx,
            g.width * 0.5,
            this.ui(70),
            this.ui(32)
        );

        //----------------------------------
        // Card
        //----------------------------------

        const cardW = Math.min(
            this.ui(700),
            g.width * 0.9
        );

        const cardH = Math.min(
            this.ui(420),
            g.height * 0.72
        );

        const cardX =
            (g.width - cardW) / 2;

        const cardY =
            (g.height - cardH) / 2;

        this.drawCard(

            ctx,

            cardX,

            cardY,

            cardW,

            cardH,

            "#4CAF50"

        );

        //----------------------------------
        // Title
        //----------------------------------

        ctx.save();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "#2E7D32";

        ctx.font =
            `bold ${this.ui(40)}px Arial`;

        ctx.fillText(

            "🍎 เกมแยกคำประวิสรรชนีย์ 🍎",

            g.width / 2,

            cardY + this.ui(70)

        );

        //----------------------------------
        // Description
        //----------------------------------

        ctx.fillStyle = "#444";

        ctx.font =
            `${this.ui(22)}px Arial`;

        ctx.fillText(

            "ลากผลไม้ลงตะกร้าให้ถูกต้อง",

            g.width / 2,

            cardY + this.ui(130)

        );

        ctx.fillText(

            "ภายในเวลา 60 วินาที",

            g.width / 2,

            cardY + this.ui(165)

        );

        //----------------------------------
        // High Score
        //----------------------------------

        ctx.fillStyle = "#FF9800";

        ctx.font =
            `bold ${this.ui(24)}px Arial`;

        ctx.fillText(

            `🏆 คะแนนสูงสุด ${g.score.highScore}`,

            g.width / 2,

            cardY + this.ui(230)

        );

        //----------------------------------
        // Start Button
        //----------------------------------

        const btnW = Math.min(
            this.ui(260),
            cardW * .6
        );

        const btnH = this.ui(70);

        const btnX =
            g.width / 2 -
            btnW / 2;

        const btnY =
            cardY +
            cardH -
            this.ui(95);

        g.startButton = {

            x: btnX,
            y: btnY,
            width: btnW,
            height: btnH

        };

        this.drawCard(

            ctx,

            btnX,

            btnY,

            btnW,

            btnH,

            "#43A047",

            "#4CAF50"

        );

        ctx.fillStyle = "white";

        ctx.font =
            `bold ${this.ui(28)}px Arial`;

        ctx.fillText(

            "▶ เริ่มเกม",

            g.width / 2,

            btnY + btnH / 2

        );

        ctx.restore();

    }

    //----------------------------------
    // Game Over
    //----------------------------------

    drawGameOver() {

        const g = this.game;
        const ctx = g.ctx;

        ctx.fillStyle =
            "rgba(0,0,0,.55)";

        ctx.fillRect(
            0,
            0,
            g.width,
            g.height
        );

        const cardW = Math.min(
            this.ui(620),
            g.width * .9
        );

        const cardH = Math.min(
            this.ui(560),
            g.height * .82
        );

        const cardX =
            (g.width - cardW) / 2;

        const cardY =
            (g.height - cardH) / 2;

        this.drawCard(

            ctx,

            cardX,

            cardY,

            cardW,

            cardH,

            "#42A5F5"

        );

        //----------------------------------
        // Title
        //----------------------------------

        ctx.save();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "#222";

        ctx.font =
            `bold ${this.ui(42)}px Arial`;

        ctx.fillText(

            "🏆 จบเกม",

            g.width / 2,

            cardY + this.ui(55)

        );

        ctx.restore();

        const bottomY =
            this.drawStatistics(

                ctx,

                cardX,

                cardY,

                cardW

            );

        this.drawRestartButton(

            ctx,

            cardX,

            cardW,

            bottomY

        );

        }
    //----------------------------------
    // Statistics
    //----------------------------------

    drawStatistics(
        ctx,
        cardX,
        cardY,
        cardW
    ) {

        const g = this.game;

        const total =
            g.score.correct +
            g.score.wrong;

        const accuracy =
            total === 0
                ? 0
                : Math.round(
                    g.score.correct /
                    total * 100
                );

        const font = this.ui(24);

        const line = this.ui(42);

        let y =
            cardY +
            this.ui(120);

        ctx.save();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font =
            `${font}px Arial`;

        ctx.fillStyle = "#222";

        ctx.fillText(
            `⭐ คะแนน : ${g.score.value}`,
            cardX + cardW / 2,
            y
        );

        y += line;

        ctx.fillText(
            `🏆 คะแนนสูงสุด : ${g.score.highScore}`,
            cardX + cardW / 2,
            y
        );

        y += line;

        ctx.fillText(
            `🔥 Combo สูงสุด : ${g.score.maxCombo}`,
            cardX + cardW / 2,
            y
        );

        y += line;

        ctx.fillStyle = "#2E7D32";

        ctx.fillText(
            `✅ ตอบถูก : ${g.score.correct}`,
            cardX + cardW / 2,
            y
        );

        y += line;

        ctx.fillStyle = "#D32F2F";

        ctx.fillText(
            `❌ ตอบผิด : ${g.score.wrong}`,
            cardX + cardW / 2,
            y
        );

        y += line;

        ctx.fillStyle = "#1976D2";

        ctx.fillText(
            `🎯 Accuracy : ${accuracy}%`,
            cardX + cardW / 2,
            y
        );

        ctx.restore();

        return y;

    }

    //----------------------------------
    // Restart Button
    //----------------------------------

    drawRestartButton(
        ctx,
        cardX,
        cardW,
        bottomY
    ) {

        const g = this.game;

        const btnW =
            Math.min(
                this.ui(260),
                cardW * .6
            );

        const btnH =
            this.ui(68);

        const btnX =
            cardX +
            (cardW - btnW) / 2;

        const btnY =
            bottomY +
            this.ui(40);

        g.restartButton = {

            x: btnX,
            y: btnY,
            width: btnW,
            height: btnH

        };

        this.drawCard(

            ctx,

            btnX,

            btnY,

            btnW,

            btnH,

            "#4CAF50",

            "#4CAF50"

        );

        ctx.save();

        ctx.fillStyle = "white";

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font =
            `bold ${this.ui(26)}px Arial`;

        ctx.fillText(

            "🔄 เล่นอีกครั้ง",

            btnX + btnW / 2,

            btnY + btnH / 2

        );

        ctx.restore();

    }

    //----------------------------------
    // Cloud
    //----------------------------------

    drawCloud(
        ctx,
        x,
        y,
        s
    ) {

        ctx.save();

        ctx.fillStyle =
            "rgba(255,255,255,.95)";

        ctx.shadowColor =
            "rgba(255,255,255,.35)";

        ctx.shadowBlur =
            this.ui(18);

        ctx.beginPath();

        ctx.arc(
            x - s * 3,
            y + s * .35,
            s * .75,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x - s * 2,
            y,
            s,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x - s,
            y - s * .25,
            s * 1.2,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x,
            y - s * .45,
            s * 1.5,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + s,
            y - s * .25,
            s * 1.2,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + s * 2,
            y,
            s,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + s * 3,
            y + s * .35,
            s * .75,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }
    }


