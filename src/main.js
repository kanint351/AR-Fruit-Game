import Game from "./game/Game.js";
import { preloadImages } from "./game/Images.js";

window.addEventListener("DOMContentLoaded", async () => {

    // โหลดรูปทั้งหมดก่อน
    await preloadImages();

    // สร้างเกม
    const game = new Game();

    function loop() {

        game.timer.update();

        if (game.renderer) {
            game.renderer.render();
        }

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