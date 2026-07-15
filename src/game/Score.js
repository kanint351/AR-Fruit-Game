export default class Score {

    constructor() {
        this.value = 0;
    }

    add() {
        this.value++;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "bold 40px Arial";
        ctx.fillText(
            "คะแนน : " + this.value,
            20,
            50
        );
    }

}