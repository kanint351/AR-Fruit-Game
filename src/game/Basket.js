export default class Basket {

    constructor(x, y, width, height, text, color) {

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.text = text;
        this.color = color;

        this.highlight = 0;

    }

    resize(x, y, width, height) {

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

    }

    update() {

        this.highlight *= 0.92;

    }

    flash() {

        this.highlight = 1;

    }

    contains(fruit) {

        const centerX = fruit.x + fruit.size / 2;
        const bottomY = fruit.y + fruit.size;

        return (

            centerX >= this.x &&
            centerX <= this.x + this.width &&

            bottomY >= this.y &&
            bottomY <= this.y + this.height

        );

    }

    draw(ctx) {

        this.update();

        ctx.save();

        //------------------------------------
        // Shadow
        //------------------------------------

        ctx.shadowColor = "rgba(0,0,0,.35)";
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 6;

        //------------------------------------
        // Gradient
        //------------------------------------

        const gradient = ctx.createLinearGradient(

            this.x,
            this.y,

            this.x,
            this.y + this.height

        );

        gradient.addColorStop(
            0,
            this.color
        );

        gradient.addColorStop(
            1,
            "#222"
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.roundRect(

            this.x,

            this.y,

            this.width,

            this.height,

            20

        );

        ctx.fill();

        //------------------------------------
        // Highlight
        //------------------------------------

        if (this.highlight > 0.01) {

            ctx.fillStyle =
                `rgba(255,255,255,${
                    this.highlight * 0.45
                })`;

            ctx.beginPath();

            ctx.roundRect(

                this.x,

                this.y,

                this.width,

                this.height,

                20

            );

            ctx.fill();

        }

        //------------------------------------
        // Border
        //------------------------------------

        ctx.shadowBlur = 0;

        ctx.lineWidth = Math.max(
            2,
            this.width * 0.02
        );

        ctx.strokeStyle = "white";

        ctx.stroke();

        //------------------------------------
        // Text
        //------------------------------------

        const fontSize = Math.max(

            18,

            Math.min(

                this.width * 0.13,

                34

            )

        );

        ctx.fillStyle = "white";

        ctx.font =
            `bold ${fontSize}px Arial`;

        ctx.textAlign = "center";

        ctx.fillText(

            this.text,

            this.x + this.width / 2,

            this.y +
            this.height / 2 +
            fontSize * 0.35

        );

        //------------------------------------
        // Decorative icons
        //------------------------------------

        ctx.font =
            `${fontSize * 0.9}px Arial`;

        ctx.fillText(

            "🧺",

            this.x + 28,

            this.y + this.height / 2 + 8

        );

        ctx.fillText(

            "🍎",

            this.x + this.width - 28,

            this.y + this.height / 2 + 8

        );

        ctx.restore();

    }

}