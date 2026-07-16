export default class UI {

    constructor(game) {

        this.game = game;

        this.startButton = {
            x: 0,
            y: 0,
            width: 300,
            height: 80
        };

        this.restartButton = {
            x: 0,
            y: 0,
            width: 300,
            height: 80
        };

    }

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

        const boxWidth = Math.min(850, g.width * 0.82);
        const boxHeight = Math.min(520, g.height * 0.72);

        const boxX = (g.width - boxWidth) / 2;
        const boxY = (g.height - boxHeight) / 2;

        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.roundRect(
            boxX,
            boxY,
            boxWidth,
            boxHeight,
            24
        );

        ctx.fill();

        ctx.strokeStyle = "#2ecc71";
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.textAlign = "center";

        ctx.fillStyle = "#2E7D32";
        ctx.font = `bold ${Math.max(34, boxWidth * 0.07)}px Arial`;

        ctx.fillText(
            "🍎 เกมแยกคำประวิสรรชนีย์ 🍎",
            g.width / 2,
            boxY + 70
        );

        ctx.font = `${Math.max(46, boxWidth * 0.08)}px Arial`;

        ctx.fillText(
            "🍎 🍌 🍉 🍇 🥭 🍍",
            g.width / 2,
            boxY + 145
        );

        ctx.fillStyle = "#333";

        ctx.font = `bold ${Math.max(20, boxWidth * 0.03)}px Arial`;

        ctx.fillText(
            "ลากผลไม้ลงตะกร้าให้ถูกประเภท",
            g.width / 2,
            boxY + 230
        );

        ctx.fillText(
            "⏰ เวลา 60 วินาที",
            g.width / 2,
            boxY + 275
        );

        const bw = 300;
        const bh = 80;

        const bx = g.width / 2 - bw / 2;
        const by = boxY + 340;

        this.startButton.x = bx;
        this.startButton.y = by;
        this.startButton.width = bw;
        this.startButton.height = bh;

        const hover =
            g.pointer.x >= bx &&
            g.pointer.x <= bx + bw &&
            g.pointer.y >= by &&
            g.pointer.y <= by + bh;

        ctx.fillStyle = hover
            ? "#27AE60"
            : "#2ECC71";

        ctx.beginPath();
        ctx.roundRect(
            bx,
            by,
            bw,
            bh,
            20
        );

        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 34px Arial";

        ctx.fillText(
            "🎮 เริ่มเกม",
            g.width / 2,
            by + 50
        );

        ctx.fillStyle = "#FF4081";
        ctx.font = "bold 24px Arial";

        ctx.fillText(
            "มาเรียนรู้ไปด้วยกันอย่างสนุกสนานนะคะ 💖",
            g.width / 2,
            boxY + boxHeight - 25
        );

        ctx.textAlign = "left";

    }

    drawHUD() {

        this.game.score.draw(this.game.ctx);
        this.game.timer.draw(this.game.ctx);

    }

    drawGameOver() {

        const g = this.game;
        const ctx = g.ctx;

        ctx.fillStyle = "rgba(0,0,0,.65)";
        ctx.fillRect(
            0,
            0,
            g.width,
            g.height
        );

        const boxW = Math.min(520, g.width * 0.8);
        const boxH = 320;

        const boxX = (g.width - boxW) / 2;
        const boxY = (g.height - boxH) / 2;

        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.roundRect(
            boxX,
            boxY,
            boxW,
            boxH,
            24
        );

        ctx.fill();

        ctx.textAlign = "center";

        ctx.fillStyle = "#2E7D32";

        ctx.font = "bold 46px Arial";

        ctx.fillText(
            "🏆 จบเกม",
            g.width / 2,
            boxY + 70
        );

        ctx.fillStyle = "#333";

        ctx.font = "bold 30px Arial";

        ctx.fillText(
            `คะแนน ${g.score.value}`,
            g.width / 2,
            boxY + 145
        );

        const bw = 260;
        const bh = 70;

        const bx = g.width / 2 - bw / 2;
        const by = boxY + 210;

        this.restartButton.x = bx;
        this.restartButton.y = by;

        ctx.fillStyle = "#2ECC71";

        ctx.beginPath();
        ctx.roundRect(
            bx,
            by,
            bw,
            bh,
            18
        );

        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 30px Arial";

        ctx.fillText(
            "🔄 เล่นอีกครั้ง",
            g.width / 2,
            by + 45
        );

        ctx.textAlign = "left";

    }

}