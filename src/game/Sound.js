export default class Sound {

    constructor() {

        const base = import.meta.env.BASE_URL;

        this.correct = new Audio(base + "assets/sounds/correct.ogg");
        this.wrong = new Audio(base + "assets/sounds/wrong.ogg");
        this.click = new Audio(base + "assets/sounds/click.ogg");
        this.gameover = new Audio(base + "assets/sounds/gameover.ogg");
        this.bgm = new Audio(base + "assets/sounds/bgm.mp3");

        this.correct.volume = 0.5;
        this.wrong.volume = 0.5;
        this.click.volume = 0.4;
        this.gameover.volume = 0.6;
        this.bgm.volume = 0.25;

        this.bgm.loop = true;

    }

    play(sound) {

        console.log(sound.src);

        sound.currentTime = 0;

        sound.play().catch(err => console.log(err));

    }

}