export default class Lives {

    constructor(game) {

        this.game = game;

        this.max = 3;

        this.value = 3;

    }

    reset() {

        this.value = this.max;

    }

    lose() {

        if (this.value > 0) {

            this.value--;

        }

    }

    isDead() {

        return this.value <= 0;

    }

    draw(ctx) {

        const fontSize = Math.max(
    20,
    Math.min(
        this.game.width * 0.025,
        32
    )
);

        ctx.font = `${fontSize}px Arial`;

        ctx.textAlign = "left";

        let hearts = "";

        for (let i = 0; i < this.max; i++) {

            hearts +=
                i < this.value
                    ? "❤️ "
                    : "🤍 ";

        }

        

const margin = Math.max(
    20,
    this.game.width * 0.02
);

ctx.fillText(
    hearts,
    margin + 10,
    margin + 22
);

    }

}