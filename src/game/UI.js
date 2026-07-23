import Images from "./Images.js";

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
        const isMobile = g.width < 768;

        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(0, 0, g.width, g.height);

        ctx.fillStyle = "#7ED957";
        const grassHeight = Math.max(
    90,
    g.height * 0.11
);

ctx.fillRect(

    0,

    g.height - grassHeight,

    g.width,

    grassHeight

);

        const boxWidth = Math.min(
    g.width * 0.88,
    900
);

const boxHeight = Math.min(
    g.height * 0.75,
    540
);

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
        const titleSize = Math.max(
    28,
    Math.min(
        boxWidth * 0.06,
        52
    )
);

ctx.font = `bold ${titleSize}px Arial`;

        ctx.fillText(
            "🍎 เกมแยกคำประวิสรรชนีย์ 🍎",
            g.width / 2,
            boxY + 70
        );

        

const fruits = [
    Images.apple,
    Images.banana,
    Images.grape,
    Images.mango,
    Images.watermelon,
    Images.orange,
    Images.pineapple,
];

const iconSize =
    isMobile
        ? 48
        : 68;

const spacing = iconSize + 12;

const startX =
    g.width / 2 -
    ((fruits.length - 1) * spacing) / 2;

    const fruitY = boxY + boxHeight * 0.18;

for (let i = 0; i < fruits.length; i++) {

    const img = fruits[i];

    if (img.complete) {

        ctx.save();

        ctx.shadowColor = "rgba(0,0,0,.18)";
        ctx.shadowBlur = 8;

        ctx.drawImage(
            img,
            startX + i * spacing - iconSize / 2,
            fruitY,
            iconSize,
            iconSize
        );

        ctx.restore();

    }

}

        ctx.fillStyle = "#333";

        const textSize = Math.max(
    18,
    Math.min(
        boxWidth * 0.032,
        28
    )
);

ctx.font = `bold ${textSize}px Arial`;

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

        const bw = Math.min(
    g.width * 0.34,
    320
);

const bh = Math.max(
    g.height * 0.08,
    70
);

        const bx = g.width / 2 - bw / 2;
        const by = boxY + boxHeight * 0.72;

        this.startButton.x = bx;
        this.startButton.y = by;
        this.startButton.width = bw;
        this.startButton.height = bh;

        const hover =
            g.pointer.x >= bx &&
            g.pointer.x <= bx + bw &&
            g.pointer.y >= by &&
            g.pointer.y <= by + bh;

        const scale = hover ? 1.05 : 1;

ctx.save();

ctx.translate(
    bx + bw / 2,
    by + bh / 2
);

ctx.scale(scale, scale);

ctx.translate(
    -(bx + bw / 2),
    -(by + bh / 2)
);

ctx.fillStyle = hover
    ? "#27AE60"
    : "#2ECC71";

        ctx.shadowColor = "rgba(0,0,0,.25)";
ctx.shadowBlur = 15;

ctx.beginPath();

ctx.roundRect(
    bx,
    by,
    bw,
    bh,
    22
);

ctx.fill();

ctx.shadowBlur = 0;

ctx.lineWidth = 4;
ctx.strokeStyle = "white";
ctx.stroke();

        ctx.fillStyle = "white";

ctx.font =
`bold ${Math.max(
24,
bh * 0.42
)}px Arial`;

ctx.fillText(

    "▶ เริ่มเกม",

    g.width / 2,

    by + bh / 2 + 10

);

ctx.restore();

        ctx.fillStyle = "#FF4081";
        ctx.font = `bold ${Math.max(
18,
boxWidth * 0.028
)}px Arial`;

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
        const boxH = Math.min(
    g.height * 0.45,
    440
);

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

        ctx.font = `bold ${Math.max(
    30,
    Math.min(
        boxW * 0.08,
        48
    )
)}px Arial`;

        ctx.fillText(
            "🏆 จบเกม",
            g.width / 2,
            boxY + 70
        );

        ctx.fillStyle = "#333";

        ctx.font = `bold ${Math.max(
    22,
    Math.min(
        boxW * 0.055,
        34
    )
)}px Arial`;

        const line = 45;

ctx.fillStyle = "#333";
ctx.font = "bold 30px Arial";

ctx.fillText(
    `⭐ คะแนน ${g.score.value}`,
    g.width / 2,
    boxY + 135
);

ctx.fillText(
    `🏆 สูงสุด ${g.score.highScore}`,
    g.width / 2,
    boxY + 135 + line
);

ctx.fillText(
    `🔥 Combo สูงสุด ${g.score.maxCombo}`,
    g.width / 2,
    boxY + 135 + line * 2
);

        const bw = Math.min(
    boxW * 0.6,
    280
);

const bh = Math.max(
    g.height * 0.075,
    65
);

        const bx = g.width / 2 - bw / 2;
        const by = boxY + 290;
        

        this.restartButton.x = bx;
this.restartButton.y = by;
this.restartButton.width = bw;
this.restartButton.height = bh;

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
        ctx.font = `bold ${Math.max(
22,
bh * 0.42
)}px Arial`;
        ctx.textBaseline = "middle";

ctx.fillText(
    "🔄 เล่นอีกครั้ง",
    g.width / 2,
    by + bh / 2
);

ctx.textBaseline = "alphabetic";

        

    }

}