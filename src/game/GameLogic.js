export default class GameLogic {

    constructor(game) {

        this.game = game;

        this.spawnTimer = 0;
        this.spawnDelay = 700;

    }

    //----------------------------------
    // เริ่มเกม
    //----------------------------------

    start() {

        const g = this.game;

        g.started = true;
        g.gameOver = false;
        g.win = false;

        g.dragFruit = null;

        g.effects.length = 0;

        g.score.reset();

        g.timer.reset(60);
        g.timer.start();

        g.lives.reset();

        g.createSpawnSlots();

        for (const fruit of g.fruits) {

            fruit.releaseSlot();

            fruit.active = false;
            fruit.dragging = false;
            fruit.scale = 0;

        }

        this.spawnTimer = performance.now();

        for (let i = 0; i < g.fruits.length; i++) {

            this.spawnFruit();

        }

    }

    //----------------------------------
    // เล่นอีกครั้ง
    //----------------------------------

    restart() {

        const g = this.game;

        // รีเซ็ตเสียง
        g.sound.bgm.pause();
        g.sound.bgm.currentTime = 0;

        // รีเซ็ตสถานะเกม
        g.started = false;
        g.gameOver = false;
        g.win = false;

        g.dragFruit = null;

        g.effects.length = 0;

        g.score.reset();

        g.timer.reset(60);

        g.lives.reset();

        g.createSpawnSlots();

        // รีเซ็ตผลไม้ทุกลูก
        for (const fruit of g.fruits) {

            fruit.releaseSlot();

            fruit.active = false;
            fruit.dragging = false;
            fruit.scale = 0;

        }

        this.spawnTimer = 0;

        this.start();

        g.sound.bgm.play().catch(console.error);

    }

    //----------------------------------
    // อัปเดตเกม
    //----------------------------------

    update() {

        const g = this.game;

        if (!g.started) return;

        if (g.gameOver) return;

        g.timer.update();

        const now = performance.now();

        if (!this.spawnTimer) {

            this.spawnTimer = now;

        }

        if (now - this.spawnTimer >= this.spawnDelay) {

            this.spawnFruit();

            this.spawnTimer = now;

        }

        for (const fruit of g.fruits) {

            if (fruit !== g.dragFruit) {

                fruit.update();

            }

        }

        for (let i = g.effects.length - 1; i >= 0; i--) {

            g.effects[i].update();

            if (g.effects[i].dead) {

                g.effects.splice(i, 1);

            }

        }

        if (g.timer.isFinished()) {

            this.gameOver();

        }

    }

    //----------------------------------
    // สร้างผลไม้
    //----------------------------------

    spawnFruit() {

        const g = this.game;

        const fruit = g.fruits.find(f => !f.active);

        if (!fruit) return;

        const freeSlots = g.spawnSlots.filter(
            slot => slot.fruit === null
        );

        if (freeSlots.length === 0) return;

        fruit.reset();

        const slot =
            freeSlots[
                Math.floor(
                    Math.random() * freeSlots.length
                )
            ];

        slot.fruit = fruit;

        fruit.slot = slot;

        fruit.x = slot.x - fruit.size / 2;
        fruit.y = slot.y - fruit.size / 2;

        fruit.active = true;
        fruit.dragging = false;
        fruit.scale = 0;

    }

    //----------------------------------
    // จบเกม
    //----------------------------------

    gameOver() {

        const g = this.game;

        if (g.gameOver) return;

        g.gameOver = true;

        g.timer.stop();

        g.sound.play(g.sound.gameover);

        g.sound.bgm.pause();
        g.sound.bgm.currentTime = 0;

        for (const fruit of g.fruits) {

            fruit.releaseSlot();

            fruit.active = false;

        }

        g.score.saveHighScore();

    }

}