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

    drawGame() {

        const g = this.game;
        const ctx = g.ctx;

        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(0,0,g.width,g.height);

        //---------------------------------
// พื้นหญ้า Responsive
//---------------------------------

const grassHeight = Math.max(
    80,
    g.height * 0.12
);

ctx.fillStyle = "#7ED957";

ctx.fillRect(

    0,

    g.height - grassHeight,

    g.width,

    grassHeight

);

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

    }

    drawStart(){

        const g=this.game;
        const ctx=g.ctx;

        ctx.fillStyle="#87CEEB";
        ctx.fillRect(0,0,g.width,g.height);

        ctx.fillStyle="#7ED957";
        ctx.fillRect(
            0,
            g.height-110,
            g.width,
            110
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
            `✅ ตอบถูก : ${g.score.correct}`,
            g.width/2,
            startY+line
        );

        ctx.fillText(
            `❌ ตอบผิด : ${g.score.wrong}`,
            g.width/2,
            startY+line*2
        );

        ctx.fillText(
            `🎯 ความแม่นยำ : ${accuracy}%`,
            g.width/2,
            startY+line*3
        );

        // ส่งตำแหน่งล่างสุดกลับไป
        return startY + line * 3;

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

            y: bottomY + 55,

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

}