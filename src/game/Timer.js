export default class Timer {

    constructor(seconds) {

        this.time = seconds;

        this.interval = setInterval(() => {

            if (this.time > 0) {
                this.time--;
            }

        },1000);

    }

        stop() {

        clearInterval(this.interval);
        
    }

    draw(ctx){

        ctx.fillStyle="white";
        ctx.font="bold 40px Arial";

        ctx.fillText(
            "เวลา : "+this.time,
            window.innerWidth-250,
            50
        );

    }

}