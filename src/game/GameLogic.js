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

    }

    // สร้างผลไม้เริ่มต้น
    for (let i = 0; i < g.fruits.length; i++) {

        this.spawnFruit();

    }

}
    //-----------------------------
    // รีสตาร์ต
    //-----------------------------

    restart() {

    const g = this.game;

    g.gameOver = false;
    g.started = false;

    g.dragFruit = null;

    g.effects.length = 0;

    g.score.reset();

    g.timer.reset(60);

    g.lives.reset();

    g.createSpawnSlots();

    for (const fruit of g.fruits) {

        fruit.releaseSlot();


    }
    for (const fruit of g.fruits) {

    fruit.releaseSlot();

}

g.createSpawnSlots();

this.spawnTimer = performance.now();

this.start();

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

if (!this.spawnTimer) {

    this.spawnTimer = now;

}

if (now - this.spawnTimer > 700) {

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

    const g = this.game;

    const fruit =
        g.fruits.find(f => !f.active);

    if (!fruit) return;

    fruit.reset();

    //----------------------------------
    // Smart Spawn
    //----------------------------------

    const freeSlots =
        g.spawnSlots.filter(
            s => s.fruit === null
        );

    if (freeSlots.length === 0) {

    fruit.active = false;

    return;

}

    let bestSlot = null;
    let bestScore = -Infinity;

    for (const slot of freeSlots) {

        let minDistance = Infinity;

        for (const other of g.fruits) {

            if (
                !other.active ||
                !other.slot
            ) continue;

            const dx =
                slot.x - other.slot.x;

            const dy =
                slot.y - other.slot.y;

            const d =
                Math.hypot(dx, dy);

            if (d < minDistance) {

                minDistance = d;

            }

        }

        if (minDistance === Infinity) {

            minDistance = 99999;

        }

        // เพิ่มความสุ่มเล็กน้อย
        minDistance +=
            Math.random() * 30;

        if (minDistance > bestScore) {

            bestScore = minDistance;
            bestSlot = slot;

        }
            }

    //----------------------------------
    // วางผลไม้ลง Slot ที่ดีที่สุด
    //----------------------------------

    if (!bestSlot) return;

    bestSlot.fruit = fruit;

    fruit.slot = bestSlot;

    fruit.x =
        bestSlot.x -
        fruit.size / 2;

    fruit.y =
        bestSlot.y -
        fruit.size / 2;
        fruit.dragging = false;

fruit.scale = 0;

    fruit.active = true;

}
    //-----------------------------
    // Game Over
    //-----------------------------

    gameOver() {

    const g = this.game;

    for (const fruit of g.fruits) {

    fruit.releaseSlot();

}

    g.gameOver = true;

    g.timer.stop();

    // บันทึกคะแนนสูงสุด
    g.score.saveHighScore();

}

}