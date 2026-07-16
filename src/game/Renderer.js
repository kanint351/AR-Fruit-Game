export default class Renderer {

    constructor(game) {

        this.game = game;

    }

    render() {

        const ctx = this.game.ctx;

        ctx.clearRect(
            0,
            0,
            this.game.width,
            this.game.height
        );

        if (!this.game.started) {

            this.drawStart();
            return;

        }

        if (this.game.gameOver) {

            this.drawGameOver();
            return;

        }

        this.drawGame();

    }

    //---------------------------------
    // ระหว่างเล่น
    //---------------------------------

    drawGame() {

        const g = this.game;
        const ctx = g.ctx;

        // พื้นหลัง
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(0, 0, g.width, g.height);

        // พื้นหญ้า
        ctx.fillStyle = "#7ED957";
        ctx.fillRect(
            0,
            g.height - 110,
            g.width,
            110
        );

        // ตะกร้า
        g.leftBasket.draw(ctx);
        g.rightBasket.draw(ctx);

        // ผลไม้
        for (const fruit of g.fruits) {

            fruit.draw(ctx);

        }

        // เอฟเฟกต์
        for (const effect of g.effects) {

            effect.update();
            effect.draw(ctx);

        }

        // คะแนน + เวลา
        g.score.draw(ctx);
        g.timer.draw(ctx);

    }

    //---------------------------------
    // หน้าเริ่มเกม
    //---------------------------------

    drawStart() {

        const g = this.game;
        const ctx = g.ctx;

        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(0, 0, g.width, g.height);

        ctx.fillStyle = "#7ED957";
        ctx.fillRect(
            0,
            g.height - 110,
            g.width,
            110
        );

        ctx.textAlign = "center";

        ctx.fillStyle = "#2E7D32";
        ctx.font = "bold 56px Arial";

        ctx.fillText(
            "🍎 เกมแยกคำประวิสรรชนีย์ 🍎",
            g.width / 2,
            140
        );

        ctx.font = "36px Arial";

        ctx.fillText(
            "คลิกเพื่อเริ่มเกม",
            g.width / 2,
            240
        );

    }

    //---------------------------------
    // จบเกม
    //---------------------------------

    drawGameOver() {

        const g = this.game;
        const ctx = g.ctx;

        // พื้นหลังมืด
        ctx.fillStyle = "rgba(0,0,0,.65)";
        ctx.fillRect(
            0,
            0,
            g.width,
            g.height
        );

        // คำนวณ Accuracy
        const total =
            g.score.correct + g.score.wrong;

        const accuracy =
            total === 0
                ? 0
                : Math.round(
                    g.score.correct /
                    total * 100
                );

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        //---------------------------------
        // หัวข้อ
        //---------------------------------

        ctx.fillStyle = "white";
        ctx.font = "bold 60px Arial";

        ctx.fillText(
            "🏆 จบเกม",
            g.width / 2,
            g.height / 2 - 120
        );

        //---------------------------------
        // สถิติ
        //---------------------------------

        ctx.font = "32px Arial";

        ctx.fillText(
            `⭐ คะแนน : ${g.score.value}`,
            g.width / 2,
            g.height / 2 - 40
        );

        ctx.fillText(
            `✅ ตอบถูก : ${g.score.correct}`,
            g.width / 2,
            g.height / 2 + 10
        );

        ctx.fillText(
            `❌ ตอบผิด : ${g.score.wrong}`,
            g.width / 2,
            g.height / 2 + 60
        );

        ctx.fillText(
            `🎯 ความแม่นยำ : ${accuracy}%`,
            g.width / 2,
            g.height / 2 + 110
        );

        //---------------------------------
        // ปุ่มเล่นใหม่
        //---------------------------------

        g.restartButton = {

            x: g.width / 2 - 120,
            y: g.height / 2 + 170,
            width: 240,
            height: 65

        };

        ctx.fillStyle = "#4CAF50";

        ctx.beginPath();

        ctx.roundRect(
            g.restartButton.x,
            g.restartButton.y,
            g.restartButton.width,
            g.restartButton.height,
            16
        );

        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 30px Arial";

        ctx.fillText(
            "🔄 เล่นใหม่",
            g.width / 2,
            g.restartButton.y + 33
        );

    }

}