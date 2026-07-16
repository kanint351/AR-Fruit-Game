import Game from "./game/Game.js";

window.addEventListener("DOMContentLoaded", () => {

    const game = new Game();

    function loop() {

        // อัปเดตเวลา
        game.timer.update();

        // วาดเกม
        if (game.renderer) {
            game.renderer.render();
        }

        // เช็กหมดเวลา
        if (
            game.timer.isFinished() &&
            !game.gameOver
        ) {

            game.gameOver = true;

            game.timer.stop();

        }

        requestAnimationFrame(loop);

    }

    loop();

});