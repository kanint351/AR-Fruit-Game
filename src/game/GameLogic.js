export default class GameLogic {

    constructor(game) {

        this.game = game;
        this.spawnTimer = 0;
        this.spawnDelay = 700;

    


    }

    //-----------------------------
    // เริ่มเกม
    //-----------------------------

    start() {

        const g = this.game;

        g.started = true;
        g.gameOver = false;
        g.restartButton = null;

        g.score.reset();

        g.timer.reset(60);
        g.timer.start();
        this.spawnTimer = performance.now();
        for (const fruit of g.fruits) {
            fruit.active = false;
            g.effects.length = 0;
            

        }

    }

    //-----------------------------
    // รีสตาร์ต
    //-----------------------------

    restart() {
        const g = this.game;

    g.effects.length = 0;

    for (const fruit of g.fruits) {

        fruit.active = false;
        fruit.reset();

    }

        this.start();

    }

    //-----------------------------
    // อัปเดตเกม
    //-----------------------------

    update() {
        
        const g = this.game;

        if (!g.started) return;

        if (g.gameOver) return;

        //-----------------
        // Timer
        //-----------------

        g.timer.update();
        const now = performance.now();

if (now - this.spawnTimer >= this.spawnDelay) {

    this.spawnFruit();

    this.spawnTimer = now;
}

        //-----------------
        // Fruits
        //-----------------

        for (const fruit of g.fruits) {

            if (fruit !== g.dragFruit) {

                fruit.update();

            }

        }

        //-----------------
        // Effects
        //-----------------

        for (let i = g.effects.length - 1; i >= 0; i--) {

            const effect = g.effects[i];

            effect.update();

            if (effect.dead) {

                g.effects.splice(i, 1);

            }

        }

        //-----------------
        // หมดเวลา
        //-----------------

        if (g.timer.isFinished()) {

            this.gameOver();

        }

    }
spawnFruit() {

    const fruit = this.game.fruits.find(
        f => !f.active
    );

    if (!fruit) return;

    fruit.reset();

    fruit.active = true;

}
    //-----------------------------
    // Game Over
    //-----------------------------

    gameOver() {

        const g = this.game;

        g.gameOver = true;

        g.timer.stop();

    }

}