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

    //================================================
    // หน้าเริ่มเกม
    //================================================

    drawStart() {

        const g = this.game;
        const ctx = g.ctx;

        //---------------------------------------
        // Background
        //---------------------------------------

        const sky = ctx.createLinearGradient(
            0,
            0,
            0,
            g.height
        );

        sky.addColorStop(0, "#7DD3FC");
        sky.addColorStop(.6, "#BAE6FD");
        sky.addColorStop(1, "#EAF9FF");

        ctx.fillStyle = sky;
        ctx.fillRect(
            0,
            0,
            g.width,
            g.height
        );

        //---------------------------------------
        // Grass
        //---------------------------------------

        const grassHeight = Math.max(
            80,
            g.height * 0.12
        );

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

        //---------------------------------------
        // Panel
        //---------------------------------------

        const panelWidth = Math.min(
            g.width * 0.88,
            900
        );

        const panelHeight = Math.min(
            g.height * 0.78,
            560
        );

        const panelX =
            (g.width - panelWidth) / 2;

        const panelY =
            (g.height - panelHeight) / 2;

        ctx.fillStyle = "#ffffff";

        ctx.beginPath();

        ctx.roundRect(
            panelX,
            panelY,
            panelWidth,
            panelHeight,
            28
        );

        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = "#2ECC71";
        ctx.stroke();

        //---------------------------------------
        // Responsive positions
        //---------------------------------------

        const titleY =
            panelY + panelHeight * 0.14;

        const fruitY =
            panelY + panelHeight * 0.25;

        const ruleY =
            panelY + panelHeight * 0.50;

        const timeY =
            panelY + panelHeight * 0.60;

        const buttonY =
            panelY + panelHeight * 0.72;

        const footerY =
    panelY +
    panelHeight -
    Math.max(20, panelHeight * 0.05);

        //---------------------------------------
        // Title
        //---------------------------------------

        ctx.textAlign = "center";

        const titleSize = Math.max(
    22,
    Math.min(panelWidth * 0.055, 48)
);

        ctx.fillStyle = "#2E7D32";

        ctx.font =
            `bold ${titleSize}px Arial`;

        ctx.fillText(
            "🍎 เกมแยกคำประวิสรรชนีย์ 🍎",
            g.width / 2,
            titleY
        );

        //---------------------------------------
        // Fruits
        //---------------------------------------

        const fruits = [

            Images.apple,
            Images.banana,
            Images.grape,
            Images.mango,
            Images.watermelon,
            Images.orange,
            Images.pineapple

        ];

        const iconSize = Math.max(
            42,
            Math.min(panelWidth * 0.08, 68)
        );

        const gap = Math.min(
    iconSize * 0.95,
    panelWidth / 8
);

        const startX =
            g.width / 2 -
            ((fruits.length - 1) * gap) / 2;

        for (let i = 0; i < fruits.length; i++) {

            const img = fruits[i];

            if (!img.complete) continue;

            ctx.save();

            ctx.shadowColor =
                "rgba(0,0,0,.18)";

            ctx.shadowBlur = 8;

            ctx.drawImage(

                img,

                startX +
                i * gap -
                iconSize / 2,

                fruitY,

                iconSize,

                iconSize

            );

            ctx.restore();

        }

        //---------------------------------------
        // Rule
        //---------------------------------------

        const bodySize = Math.max(
            18,
            Math.min(panelWidth * 0.032, 28)
        );

        ctx.fillStyle = "#333";

        ctx.font =
            `bold ${bodySize}px Arial`;

        ctx.fillText(
            "ลากผลไม้ลงตะกร้าให้ถูกประเภท",
            g.width / 2,
            ruleY
        );

        ctx.fillText(
            "⏰ เวลา 60 วินาที",
            g.width / 2,
            timeY
        );

        //---------------------------------------
        // Button
        //---------------------------------------

        const bw = Math.min(
    panelWidth * 0.40,
    320
);

const bh = Math.max(
    60,
    Math.min(panelHeight * 0.15, 80)
);

        const bx =
            g.width / 2 -
            bw / 2;

        this.startButton.x = bx;
        this.startButton.y = buttonY;
        this.startButton.width = bw;
        this.startButton.height = bh;

        const hover =

            g.pointer.x >= bx &&
            g.pointer.x <= bx + bw &&
            g.pointer.y >= buttonY &&
            g.pointer.y <= buttonY + bh;

        ctx.save();

        ctx.shadowColor =
            "rgba(0,0,0,.25)";

        ctx.shadowBlur = 16;

        ctx.fillStyle =
            hover
                ? "#28C76F"
                : "#2ECC71";

        ctx.beginPath();

        ctx.roundRect(
            bx,
            buttonY,
            bw,
            bh,
            22
        );

        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.fillStyle = "#fff";

        ctx.font = `bold ${
    Math.max(
        22,
        Math.min(bh * 0.42, 36)
    )
}px Arial`;

        ctx.fillText(
            "▶ เริ่มเกม",
            g.width / 2,
            buttonY + bh / 2 + 10
        );

        ctx.restore();

        //---------------------------------------
        // Footer
        //---------------------------------------

        ctx.fillStyle = "#FF4081";

        ctx.font =
            `bold ${Math.max(16,panelWidth*0.026)}px Arial`;

        ctx.fillText(

            "มาเรียนรู้ไปด้วยกันอย่างสนุกสนานนะคะ 💖",

            g.width / 2,

            footerY

        );

        ctx.textAlign = "left";

    }
        //=========================================
    // HUD
    //=========================================

    drawHUD() {

        const ctx = this.game.ctx;

        this.game.score.draw(ctx);
        this.game.timer.draw(ctx);
        this.game.lives.draw(ctx);

    }

    //=========================================
    // GAME OVER
    //=========================================

    drawGameOver() {

    const g = this.game;
    const ctx = g.ctx;

    //----------------------------------
    // ฉากมืด
    //----------------------------------

    ctx.fillStyle = "rgba(0,0,0,.65)";
    ctx.fillRect(
        0,
        0,
        g.width,
        g.height
    );

    //----------------------------------
    // กล่อง
    //----------------------------------

    const boxW = Math.min(
        g.width * 0.82,
        560
    );

    const boxH = Math.min(
        g.height * 0.72,
        520
    );

    const boxX = (g.width - boxW) / 2;
    const boxY = (g.height - boxH) / 2;

    ctx.fillStyle = "#FFF";

    ctx.beginPath();
    ctx.roundRect(
        boxX,
        boxY,
        boxW,
        boxH,
        24
    );
    ctx.fill();

    //----------------------------------
    // Title
    //----------------------------------

    const titleSize = Math.max(
        30,
        Math.min(boxW * 0.08, 48)
    );

    ctx.textAlign = "center";
    ctx.fillStyle = "#2E7D32";
    ctx.font = `bold ${titleSize}px Arial`;

    ctx.fillText(
        "🏆 จบเกม",
        g.width / 2,
        boxY + 60
    );

    //----------------------------------
    // ข้อมูลคะแนน
    //----------------------------------

    const textSize = Math.max(
        20,
        Math.min(boxW * 0.055, 32)
    );

    const line = textSize + 20;

    let y = boxY + 120;

    ctx.fillStyle = "#333";
    ctx.font = `bold ${textSize}px Arial`;

    ctx.fillText(
        `⭐ คะแนน ${g.score.value}`,
        g.width / 2,
        y
    );

    y += line;

    ctx.fillText(
        `🏆 สูงสุด ${g.score.highScore}`,
        g.width / 2,
        y
    );

    y += line;

    ctx.fillText(
        `🔥 Combo สูงสุด ${g.score.maxCombo}`,
        g.width / 2,
        y
    );

    y += line;

    ctx.fillText(
        `✅ ตอบถูก ${g.score.correct}`,
        g.width / 2,
        y
    );

    y += line;

    ctx.fillText(
        `❌ ตอบผิด ${g.score.wrong}`,
        g.width / 2,
        y
    );

    y += line;

    const total =
        g.score.correct +
        g.score.wrong;

    const accuracy =
        total === 0
            ? 0
            : Math.round(
                g.score.correct /
                total *
                100
            );

    ctx.fillText(
        `🎯 ความแม่นยำ ${accuracy}%`,
        g.width / 2,
        y
    );

    //----------------------------------
    // ปุ่มเล่นใหม่
    //----------------------------------

    const bw = Math.min(
        boxW * 0.65,
        280
    );

    const bh = Math.max(
        60,
        boxH * 0.12
    );

    const bx =
        g.width / 2 - bw / 2;

    const by =
        boxY + boxH - bh - 35;

    this.restartButton = {
        x: bx,
        y: by,
        width: bw,
        height: bh
    };

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

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#FFF";
    ctx.stroke();

    ctx.fillStyle = "#FFF";
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
        //=========================================
    // ปุ่มมาตรฐาน
    //=========================================

    drawButton(
        ctx,
        x,
        y,
        width,
        height,
        text,
        color = "#2ECC71"
    ) {

        ctx.save();

        ctx.shadowColor = "rgba(0,0,0,.25)";
        ctx.shadowBlur = 12;

        ctx.fillStyle = color;

        ctx.beginPath();

        ctx.roundRect(
            x,
            y,
            width,
            height,
            20
        );

        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";

        ctx.font = `bold ${Math.max(
            22,
            height * 0.40
        )}px Arial`;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            text,
            x + width / 2,
            y + height / 2
        );

        ctx.restore();

    }

    //=========================================
    // กล่องมาตรฐาน
    //=========================================

    drawPanel(
        ctx,
        x,
        y,
        width,
        height
    ) {

        ctx.save();

        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        ctx.roundRect(
            x,
            y,
            width,
            height,
            24
        );

        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = "#2ECC71";
        ctx.stroke();

        ctx.restore();

    }

    //=========================================
    // ข้อความกลาง
    //=========================================

    drawCenterText(
        ctx,
        text,
        x,
        y,
        size,
        color = "#333",
        bold = true
    ) {

        ctx.save();

        ctx.fillStyle = color;

        ctx.textAlign = "center";

        ctx.font =
            `${bold ? "bold " : ""}${size}px Arial`;

        ctx.fillText(
            text,
            x,
            y
        );

        ctx.restore();

    }

    //=========================================
    // วาดรูปพร้อมเงา
    //=========================================

    drawIcon(
        ctx,
        img,
        x,
        y,
        size
    ) {

        if (!img.complete) return;

        ctx.save();

        ctx.shadowColor =
            "rgba(0,0,0,.18)";

        ctx.shadowBlur = 8;

        ctx.drawImage(
            img,
            x,
            y,
            size,
            size
        );

        ctx.restore();

    }

}

