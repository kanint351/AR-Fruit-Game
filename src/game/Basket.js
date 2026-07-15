export default class Basket {

    constructor(x, y, width, height, text, color){

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.color = color;

    }

    draw(ctx){

        ctx.fillStyle = this.color;

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;

        ctx.strokeRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        ctx.fillStyle = "white";
        ctx.font = "bold 26px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            this.text,
            this.x + this.width/2,
            this.y + this.height/2 + 8
        );

        ctx.textAlign = "left";

    }

    contains(fruit){
        const centerX = fruit.x + fruit.size/2;
        const bottomY = fruit.y + fruit.size;

        return(
            centerX >= this.x &&
            centerX <= this.x + this.width &&
            bottomY >= this.y &&
            bottomY <= this.y + this.height
        );
    }

}