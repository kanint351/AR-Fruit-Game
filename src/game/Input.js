export default class Input {

    constructor(game) {

        this.game = game;

        this.canvas = game.canvas;

        this.bind();

    }

    bind() {

        const canvas = this.canvas;

        //-------------------------
        // Mouse Move
        //-------------------------

        canvas.addEventListener(
            "mousemove",
            (e) => {

                this.updatePointer(
                    e.clientX,
                    e.clientY
                );

                this.drag();

            }
        );

        //-------------------------
        // Mouse Down
        //-------------------------

        canvas.addEventListener(
            "mousedown",
            (e) => {

                this.updatePointer(
                    e.clientX,
                    e.clientY
                );

                this.game.pointer.down = true;

                this.mouseDown();

            }
        );

        //-------------------------
        // Mouse Up
        //-------------------------

        window.addEventListener(
            "mouseup",
            () => {

                this.game.pointer.down = false;

                this.mouseUp();

            }
        );

        //-------------------------
        // Touch Start
        //-------------------------

        canvas.addEventListener(
            "touchstart",
            (e) => {

                e.preventDefault();

                const touch = e.touches[0];

                this.updatePointer(
                    touch.clientX,
                    touch.clientY
                );

                this.game.pointer.down = true;

                this.mouseDown();

            },
            { passive: false }
        );

        //-------------------------
        // Touch Move
        //-------------------------

        canvas.addEventListener(
            "touchmove",
            (e) => {

                e.preventDefault();

                const touch = e.touches[0];

                this.updatePointer(
                    touch.clientX,
                    touch.clientY
                );

                this.drag();

            },
            { passive: false }
        );

        //-------------------------
        // Touch End
        //-------------------------

        window.addEventListener(
            "touchend",
            () => {

                this.game.pointer.down = false;

                this.mouseUp();

            }
        );

    }

    //---------------------------------
    // Pointer
    //---------------------------------

    updatePointer(x, y) {

        const rect =
            this.canvas.getBoundingClientRect();

        this.game.pointer.x =
            x - rect.left;

        this.game.pointer.y =
            y - rect.top;

    }

    //---------------------------------
    // Mouse Down
    //---------------------------------

    mouseDown() {

        const g = this.game;
        // กดปุ่มเล่นใหม่
if (g.gameOver) {

    const b = g.restartButton;

    if (
        b &&
        g.pointer.x >= b.x &&
        g.pointer.x <= b.x + b.width &&
        g.pointer.y >= b.y &&
        g.pointer.y <= b.y + b.height
    ) {

        g.logic.restart();
        return;

    }

}
        if (!this.game.started && !this.game.gameOver) {

    this.game.startGame();

}

        for (const fruit of g.fruits) {

            if (
                fruit.isInside(
                    g.pointer.x,
                    g.pointer.y
                )
            ) {

                g.dragFruit = fruit;

                fruit.dragging = true;

                break;

            }

        }

    }

    //---------------------------------
    // Drag
    //---------------------------------

    drag() {

        const fruit =
            this.game.dragFruit;

        if (!fruit) return;

        fruit.x =
            this.game.pointer.x -
            fruit.size / 2;

        fruit.y =
            this.game.pointer.y -
            fruit.size / 2;

    }

    //---------------------------------
    // Mouse Up
    //---------------------------------

    mouseUp() {

        const g = this.game;

        if (!g.dragFruit) return;

        g.dragFruit.dragging = false;

        g.drag.checkDrop();

        g.dragFruit = null;

    }

}