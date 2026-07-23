export default class Renderer {

    constructor(game) {

        this.game = game;

    }

    render() {

    const g = this.game;
    const ctx = g.ctx;

    ctx.imageSmoothingEnabled=true;

    ctx.clearRect(
        0,
        0,
        g.width,
        g.height
    );

    if (!g.started) {

        g.ui.drawStart();
        return;

    }

    if (g.gameOver) {

        g.ui.drawGameOver();
        return;

    }

    this.drawGame();

}

    drawGame() {

        const g = this.game;
        const ctx = g.ctx;

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

this.drawCloud(ctx,80,90,28);
this.drawCloud(ctx,320,60,24);
this.drawCloud(ctx,g.width-180,100,35);

        //---------------------------------
// พื้นหญ้า Responsive
//---------------------------------

const grassHeight = Math.max(
    80,
    g.height * 0.12
);

const grass = ctx.createLinearGradient(

    0,

    g.height-grassHeight,

    0,

    g.height

);

ctx.fillStyle = grass;

ctx.fillRect(

    0,

    g.height - grassHeight,

    g.width,

    grassHeight

);

grass.addColorStop(0,"#7ED957");
grass.addColorStop(1,"#43A047");

ctx.fillStyle = grass;

        g.leftBasket.draw(ctx);
        g.rightBasket.draw(ctx);

        for(const fruit of g.fruits){

            if(fruit.active){

                fruit.draw(ctx);

            }

        }

        for(const effect of g.effects){

            effect.draw(ctx);

        }

        g.score.draw(ctx);
        g.timer.draw(ctx);
        g.lives.draw(ctx);
        if (g.score.combo >= 3) {

    ctx.save();

    const fontSize = Math.max(
        28,
        Math.min(g.width * 0.04, 54)
    );

    const comboY = Math.max(
        60,
        g.height * 0.08
    );

    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = "center";

    let text = `🔥 COMBO x${g.score.combo}`;

    if (g.score.combo >= 10) {

        text = `👑 PERFECT x${g.score.combo}`;
        ctx.fillStyle = "#E91E63";

    } else if (g.score.combo >= 5) {

        text = `⚡ GREAT x${g.score.combo}`;
        ctx.fillStyle = "#FF9800";

    } else {

        ctx.fillStyle = "#FFD54F";

    }

    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur =
    12 +
    Math.sin(Date.now()/120)*6;

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 4;

    ctx.strokeText(
        text,
        g.width / 2,
        comboY
    );

    ctx.fillText(
        text,
        g.width / 2,
        comboY
    );

    ctx.restore();

}

    }

    drawStart(){

        const g=this.game;
        const ctx=g.ctx;

        const sky = ctx.createLinearGradient(
    0,
    0,
    0,
    g.height
);

sky.addColorStop(0,"#7DD3FC");
sky.addColorStop(.6,"#BAE6FD");
sky.addColorStop(1,"#E0F7FF");

ctx.fillStyle = sky;
ctx.fillRect(
    0,
    0,
    g.width,
    g.height
);

        ctx.textAlign="center";

        ctx.fillStyle="#2E7D32";

        ctx.font=`bold ${
            Math.max(
                34,
                Math.min(
                    g.width*0.055,
                    70
                )
            )
        }px Arial`;

        ctx.fillText(
            "🍎 เกมแยกคำประวิสรรชนีย์ 🍎",
            g.width/2,
            140
        );

        ctx.font=`${
            Math.max(
                22,
                Math.min(
                    g.width*0.03,
                    40
                )
            )
        }px Arial`;

        ctx.fillText(
            "คลิกเพื่อเริ่มเกม",
            g.width/2,
            240
        );

    }

    drawGameOver(){

        const g=this.game;
        const ctx=g.ctx;

        ctx.fillStyle="rgba(0,0,0,.65)";
        ctx.fillRect(
            0,
            0,
            g.width,
            g.height
        );

        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillStyle="white";

        ctx.font=`bold ${
            Math.max(
                38,
                Math.min(
                    g.width*0.06,
                    72
                )
            )
        }px Arial`;

        ctx.fillText(
            "🏆 จบเกม",
            g.width/2,
            g.height/2-150
        );

        const bottomY = this.drawStatistics(ctx);

this.drawRestartButton(ctx, bottomY);

    }

    drawStatistics(ctx){

        const g=this.game;

        const total=
            g.score.correct+
            g.score.wrong;

        const accuracy=
            total===0
            ?0
            :Math.round(
                g.score.correct/
                total*100
            );

        const textSize=Math.max(
            20,
            Math.min(
                g.width*0.028,
                36
            )
        );

        const line=textSize+18;

        const startY=
            g.height/2-40;

        ctx.font=`${textSize}px Arial`;
        ctx.fillStyle="white";

        ctx.fillText(
            `⭐ คะแนน : ${g.score.value}`,
            g.width/2,
            startY
        );
        ctx.fillText(

    `🏆 คะแนนสูงสุด : ${g.score.highScore}`,

    g.width / 2,

    startY + line

);
    ctx.fillText(
    `🔥 Combo สูงสุด : ${g.score.maxCombo}`,
    g.width / 2,
    startY + line * 2
);

        ctx.fillText(
            `✅ ตอบถูก : ${g.score.correct}`,
            g.width/2,
            startY + line*3
        );

        ctx.fillText(
            `❌ ตอบผิด : ${g.score.wrong}`,
            g.width/2,
            startY+line*4
        );

        ctx.fillText(
            `🎯 ความแม่นยำ : ${accuracy}%`,
            g.width/2,
            startY+line*5
        );

        // ส่งตำแหน่งล่างสุดกลับไป
        return startY + line * 4;

    }

    drawRestartButton(ctx, bottomY){

        const g=this.game;

        const buttonWidth=Math.min(
            260,
            g.width*0.35
        );

        const buttonHeight=Math.max(
            55,
            g.height*0.08
        );

        g.restartButton={

            x:g.width/2-buttonWidth/2,

            y: bottomY + 70,

            width:buttonWidth,

            height:buttonHeight

        };

        ctx.save();

        ctx.shadowColor="rgba(0,0,0,.3)";
        ctx.shadowBlur=12;

        ctx.fillStyle="#4CAF50";

        ctx.beginPath();

        ctx.roundRect(

            g.restartButton.x,

            g.restartButton.y,

            g.restartButton.width,

            g.restartButton.height,

            18

        );

        ctx.fill();

        ctx.shadowBlur=0;

        ctx.lineWidth=2;
        ctx.strokeStyle="white";
        ctx.stroke();

        ctx.fillStyle="white";

        ctx.font=`bold ${
            Math.max(
                20,
                buttonHeight*0.42
            )
        }px Arial`;

        ctx.textAlign="center";
        ctx.textBaseline="middle";

        ctx.fillText(

            "🔄 เล่นใหม่",

            g.restartButton.x+
            g.restartButton.width/2,

            g.restartButton.y+
            g.restartButton.height/2

        );

        ctx.restore();

    }

    drawCloud(ctx,x,y,s){

    ctx.save();

    ctx.fillStyle="rgba(255,255,255,.9)";

    ctx.beginPath();

    ctx.arc(x,y,s,0,Math.PI*2);
    ctx.arc(x+s*.8,y-s*.3,s*.9,0,Math.PI*2);
    ctx.arc(x+s*1.7,y,s,0,Math.PI*2);

    ctx.fill();

    ctx.restore();

}

}