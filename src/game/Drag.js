import Effect from "./Effect.js";

export default class Drag {

    constructor(game) {

        this.game = game;

    }

    checkDrop() {

        const g = this.game;
        const fruit = g.dragFruit;

        if (!fruit) return;

        let correct = false;

        // ตะกร้าซ้าย
        if (g.leftBasket.contains(fruit)) {

            correct = fruit.correct === true;

            g.leftBasket.flash();

        }

        // ตะกร้าขวา
        else if (g.rightBasket.contains(fruit)) {

            correct = fruit.correct === false;

            g.rightBasket.flash();

        }

        // ได้คะแนน
        if (correct) {

            g.score.add();

            this.spawnEffect(
                fruit.x + fruit.size / 2,
                fruit.y + fruit.size / 2,
                "#4CAF50"
            );
            fruit.active = false;

        }

        // ตอบผิด
        else {

    g.lives.lose();
    // รีเซ็ต Combo และนับตอบผิด
    g.score.miss();

    this.spawnEffect(

        fruit.x + fruit.size / 2,

        fruit.y + fruit.size / 2,

        "#F44336"

    );

    fruit.active = false;

    if (g.lives.isDead()) {

        g.logic.gameOver();

    }

}

        fruit.dragging = false;
        

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