export default class Basket {

    constructor(x, y, w, h, text, color) {

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.text = text;
        this.color = color;

        this.flashAlpha = 0;

    }

    resize(x, y, w, h) {

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

    }

    flash() {

        this.flashAlpha = 1;

    }

    update() {

        if (this.flashAlpha > 0) {

            this.flashAlpha -= 0.05;

        }

    }

    contains(fruit) {

        const cx = fruit.x + fruit.size / 2;
        const cy = fruit.y + fruit.size / 2;

        return (

            cx >= this.x &&
            cx <= this.x + this.width &&
            cy >= this.y &&
            cy <= this.y + this.height

        );

    }

    draw(ctx) {

        this.update();

        //----------------------------------
        // Responsive
        //----------------------------------

        const radius = Math.min(
            22,
            this.height * 0.25
        );

        const fontSize = Math.max(
            16,
            Math.min(
                this.width * 0.085,
                30
            )
        );

        const iconSize = fontSize * 0.9;

        const padding = this.width * 0.08;

        //----------------------------------
        // Shadow
        //----------------------------------

        ctx.save();

        ctx.shadowColor = "rgba(0,0,0,.25)";
        ctx.shadowBlur = 10;

        //----------------------------------
        // Background
        //----------------------------------

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.roundRect(

            this.x,
            this.y,
            this.width,
            this.height,
            radius

        );

        ctx.fill();

        //----------------------------------
        // Border
        //----------------------------------

        ctx.shadowBlur = 0;

        ctx.lineWidth = 4;

        ctx.strokeStyle = "white";

        ctx.stroke();

        //----------------------------------
        // Flash
        //----------------------------------

        if (this.flashAlpha > 0) {

            ctx.fillStyle =
                `rgba(255,255,255,${this.flashAlpha * .4})`;

            ctx.fill();

        }

        //----------------------------------
        // Icons
        //----------------------------------

        ctx.font = `${iconSize}px Arial`;

        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        ctx.fillText(

            "🧺",

            this.x + padding,

            this.y + this.height / 2

        );

        ctx.textAlign = "right";

        ctx.fillText(

            "🍎",

            this.x + this.width - padding,

            this.y + this.height / 2

        );

        //----------------------------------
        // Text
        //----------------------------------

        ctx.fillStyle = "white";

        ctx.font = `bold ${fontSize}px Arial`;

        ctx.textAlign = "center";

        ctx.fillText(

            this.text,

            this.x + this.width / 2,

            this.y + this.height / 2

        );

        ctx.restore();

    }

}