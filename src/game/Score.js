export default class Score {

    constructor(game) {

        this.game = game;

        this.value = 0;
        this.correct = 0;
        this.wrong = 0;

        this.combo = 0;
        this.maxCombo = 0;

        this.highScore =
            Number(localStorage.getItem("highScore")) || 0;

        this.scoreScale = 1;

    }

    reset() {

        this.value = 0;
        this.correct = 0;
        this.wrong = 0;

        this.combo = 0;
        this.maxCombo = 0;

    }

    add(point = 1) {

        this.combo++;

        if (this.combo > this.maxCombo) {

            this.maxCombo = this.combo;

        }

        if (this.combo >= 10) {

            point = 5;

        } else if (this.combo >= 5) {

            point = 3;

        } else if (this.combo >= 3) {

            point = 2;

        }

        this.value += point;

        this.correct++;

        this.saveHighScore();

        this.scoreScale = 1.15;

    }

    miss() {

        this.combo = 0;
        this.wrong++;

    }

    saveHighScore() {

        if (this.value > this.highScore) {

            this.highScore = this.value;

            localStorage.setItem(
                "highScore",
                this.highScore
            );

        }

    }

}