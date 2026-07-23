import Effect from "./Effect.js";

export default class Drag {

    constructor(game) {

        this.game = game;

    }

    checkDrop() {

        const g = this.game;
        const fruit = g.dragFruit;

        if (!fruit) return;

        console.log("Fruit:", {
    x: fruit.x,
    y: fruit.y,
    cx: fruit.x + fruit.size / 2,
    cy: fruit.y + fruit.size / 2
});

console.log("Left basket:", g.leftBasket);
console.log("Right basket:", g.rightBasket);

console.log(
    "Contains:",
    g.leftBasket.contains(fruit),
    g.rightBasket.contains(fruit)
);

        let dropped = false;
        let correct = false;

        //----------------------------------
        // ตะกร้าซ้าย
        //----------------------------------

        if (g.leftBasket.contains(fruit)) {

            dropped = true;

            correct = fruit.correct === true;

            g.leftBasket.flash();

        }

        //----------------------------------
        // ตะกร้าขวา
        //----------------------------------

        else if (g.rightBasket.contains(fruit)) {

            dropped = true;

            correct = fruit.correct === false;

            g.rightBasket.flash();

        }

        //----------------------------------
        // ปล่อยนอกตะกร้า
        //----------------------------------

        if (!dropped) {

            fruit.dragging = false;
            g.dragFruit = null;

            return;

        }

        //----------------------------------
        // ตอบถูก
        //----------------------------------

        if (correct) {

            g.score.add();

            g.sound.play(g.sound.correct);

            this.spawnEffect(

                fruit.x + fruit.size / 2,

                fruit.y + fruit.size / 2,

                "#4CAF50"

            );

        }

        //----------------------------------
        // ตอบผิด
        //----------------------------------

        else {

            g.lives.lose();

            g.sound.play(g.sound.wrong);

            g.score.miss();

            this.spawnEffect(

                fruit.x + fruit.size / 2,

                fruit.y + fruit.size / 2,

                "#F44336"

            );

            if (g.lives.isDead()) {

                g.logic.gameOver();

            }
            

        }

        //----------------------------------
        // เอาผลไม้ออกและสร้างใหม่
        //----------------------------------

        fruit.releaseSlot();

        fruit.active = false;

        fruit.dragging = false;

        g.dragFruit = null;

        g.logic.spawnFruit();

    }

    spawnEffect(x, y, color) {

        for (let i = 0; i < 12; i++) {

            this.game.effects.push(

                new Effect(
                    x,
                    y,
                    color
                )

            );

        }

    }

}