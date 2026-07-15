export default class Effect {

    constructor(x, y, text){

        this.x = x;
        this.y = y;
        this.text = text;

        this.life = 40;
    }

    update(){

        this.y -= 1;
        this.life--;

    }

    draw(ctx){

        ctx.save();

        ctx.globalAlpha = this.life / 40;

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            this.text,
            this.x,
            this.y
        );

        ctx.restore();

    }

    get dead(){

        return this.life <= 0;

    }

}