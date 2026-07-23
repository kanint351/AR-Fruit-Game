export default class Sound {

    constructor() {

    const base = import.meta.env.BASE_URL;

    this.correct = new Audio(base + "assets/sounds/correct.ogg");
    this.wrong = new Audio(base + "assets/sounds/wrong.ogg");
    this.click = new Audio(base + "assets/sounds/click.ogg");
    this.gameover = new Audio(base + "assets/sounds/gameover.ogg");
    this.bgm = new Audio(base + "assets/sounds/bgm.mp3");

    this.bgm.loop = true;

    // preload
    this.correct.preload = "auto";
    this.wrong.preload = "auto";
    this.click.preload = "auto";
    this.gameover.preload = "auto";
    this.bgm.preload = "auto";
    }

    unlock() {

        const sounds = [
            this.correct,
            this.wrong,
            this.click,
            this.gameover,
            
        ];

        sounds.forEach(sound => {

            sound.play()
                .then(() => {
                    sound.pause();
                    sound.currentTime = 0;
                })
                .catch(() => {});

        });

    }

    play(sound) {

        sound.currentTime = 0;
        sound.play().catch(() => {});

    }

}

