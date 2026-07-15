import Basket from "./Basket.js";
import Fruit from "./Fruit.js";
import Score from "./Score.js";
import Timer from "./Timer.js";
import Effect from "./Effect.js";

import { startCamera } from "../ar/camera.js";
import { createHandDetector, detectHands } from "../ar/hand.js";
import Gesture from "../ar/gesture.js";

import correctSound from "../assets/correct.mp3";
import wrongSound from "../assets/wrong.mp3";
import winSound from "../assets/win.mp3";

export default class Game {

    constructor() {

        // ==========================
        // Canvas
        // ==========================

        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        document.body.appendChild(this.canvas);

        // ==========================
        // Camera
        // ==========================

        this.video = document.createElement("video");
        this.video.autoplay = true;
        this.video.playsInline = true;
        this.video.style.display = "none";

        document.body.appendChild(this.video);

        // ==========================
        // Hand Tracking
        // ==========================

        this.gesture = new Gesture();

        startCamera(this.video)
            .then(async () => {

                console.log("Camera Ready");

                await createHandDetector();

                console.log("Hand Detector Ready");

            })
            .catch(console.error);

        // ==========================
        // Game State
        // ==========================

        this.started = false;
        this.gameOver = false;

        this.selectedFruit = null;
        this.handX = 0;
        this.handY = 0;

        // ==========================
        // Score
        // ==========================

        this.score = new Score();

        this.correctCount = 0;
        this.wrongCount = 0;

        // ==========================
        // Timer
        // ==========================

        this.timer = null;

        // ==========================
        // Effect
        // ==========================

        this.effects = [];

        // ==========================
        // Sounds
        // ==========================

        this.correctAudio = new Audio(correctSound);
        this.wrongAudio = new Audio(wrongSound);
        this.winAudio = new Audio(winSound);

        // ==========================
        // Basket
        // ==========================

        this.leftBasket = new Basket(

            60,
            this.canvas.height - 140,

            240,
            90,

            "ประวิสรรชนีย์",

            "#2ecc71"

        );

        this.rightBasket = new Basket(

            this.canvas.width - 300,
            this.canvas.height - 140,

            240,
            90,

            "ไม่ประวิสรรชนีย์",

            "#e74c3c"

        );

        // ==========================
        // Fruits
        // ==========================

        this.fruits = [];

        for (let i = 0; i < 6; i++) {

            this.fruits.push(
                new Fruit(this.canvas)
            );

        }

        // ==========================
        // Start
        // ==========================

        this.addEvents();

        this.start();

    }
    // ==========================
// Events
// ==========================

addEvents() {

    // เริ่มเกม / เล่นใหม่
    this.canvas.addEventListener("pointerdown", () => {

        if (!this.started) {

            this.started = true;
            this.timer = new Timer(60);

            return;

        }

        if (this.gameOver) {

            this.restart();

        }

    });

}

// ==========================
// ตรวจคำตอบ
// ==========================

checkDrop() {

    if (!this.selectedFruit) return;

    const fruit = this.selectedFruit;

    let correct = false;

    // ตะกร้าซ้าย
    if (this.leftBasket.contains(fruit)) {

        correct = fruit.correct;

    }

    // ตะกร้าขวา
    else if (this.rightBasket.contains(fruit)) {

        correct = !fruit.correct;

    }

    if (correct) {

        this.score.add();

        this.correctCount++;

        this.effects.push(

            new Effect(

                fruit.x + fruit.size / 2,
                fruit.y,

                "+1 ⭐"

            )

        );

        this.correctAudio.currentTime = 0;
        this.correctAudio.play();

    }

    else {

        this.wrongCount++;

        this.wrongAudio.currentTime = 0;
        this.wrongAudio.play();

    }

    fruit.dragging = false;

if (
    this.leftBasket.contains(fruit) ||
    this.rightBasket.contains(fruit)
){
    fruit.reset();
}

this.selectedFruit = null;

}

// ==========================
// Restart
// ==========================

restart() {

    this.started = false;
    this.gameOver = false;

    this.score.value = 0;

    this.correctCount = 0;
    this.wrongCount = 0;

    this.effects = [];

    this.selectedFruit = null;

    if (this.timer) {

        this.timer.stop();
        this.timer = null;

    }

    for (const fruit of this.fruits) {

        fruit.dragging = false;
        fruit.reset();

    }

}
// ==========================
// Start
// ==========================

start() {

    requestAnimationFrame(() => this.loop());

}

// ==========================
// Loop
// ==========================

loop() {

    // ล้างหน้าจอ
    this.ctx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

    // ==========================
    // Background
    // ==========================

    if (this.video.readyState >= 2) {

        this.ctx.drawImage(
            this.video,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    } else {

        this.ctx.fillStyle = "#87CEEB";
        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }

    // พื้น
    this.ctx.fillStyle = "#7CFC00";

    this.ctx.fillRect(

        0,

        this.canvas.height - 100,

        this.canvas.width,

        100

    );

    // ==========================
    // Hand Tracking
    // ==========================

    const result = this.video.readyState >= 2
    ? detectHands(this.video)
    : null;
    let hand = null;

    

    if (result && result.landmarks.length > 0) {

        hand = result.landmarks[0];

    }

    this.gesture.update(hand);

    // ==========================
    // วาดจุดมือ
    // ==========================

    if (hand) {

        const targetX =
(
    hand[4].x +
    hand[8].x
) / 2 * this.canvas.width;

const targetY =
(
    hand[4].y +
    hand[8].y
) / 2 * this.canvas.height;
const smooth = 0.25;

this.handX += (targetX - this.handX) * smooth;
this.handY += (targetY - this.handY) * smooth;

const fingerX = this.handX;
const fingerY = this.handY;

        this.ctx.fillStyle = "red";
        this.ctx.beginPath();

this.ctx.arc(
    fingerX,
    fingerY,
    12,
    0,
    Math.PI * 2
);

this.ctx.fillStyle = "yellow";
this.ctx.fill();

        const drawLine = (a, b) => {

    this.ctx.beginPath();

    this.ctx.moveTo(
        hand[a].x * this.canvas.width,
        hand[a].y * this.canvas.height
    );

    this.ctx.lineTo(
        hand[b].x * this.canvas.width,
        hand[b].y * this.canvas.height
    );

    this.ctx.strokeStyle = "#00FF66";
    this.ctx.lineWidth = 4;
    this.ctx.stroke();

};
// นิ้วโป้ง
drawLine(0,1);
drawLine(1,2);
drawLine(2,3);
drawLine(3,4);

// นิ้วชี้
drawLine(0,5);
drawLine(5,6);
drawLine(6,7);
drawLine(7,8);

// นิ้วกลาง
drawLine(0,9);
drawLine(9,10);
drawLine(10,11);
drawLine(11,12);

// นิ้วนาง
drawLine(0,13);
drawLine(13,14);
drawLine(14,15);
drawLine(15,16);

// นิ้วก้อย
drawLine(0,17);
drawLine(17,18);
drawLine(18,19);
drawLine(19,20);
this.ctx.fillStyle = "#FF3333";

for (const point of hand) {

    this.ctx.beginPath();

    this.ctx.arc(
        point.x * this.canvas.width,
        point.y * this.canvas.height,
        6,
        0,
        Math.PI * 2
    );

    this.ctx.fill();

}

        // ==========================
        // หยิบผลไม้
        // ==========================

        if (

            this.gesture.justPinched &&
            !this.selectedFruit

        ) {

            for (const fruit of this.fruits) {

                if (

                    fruit.isInside(
                        fingerX,
                        fingerY
                    )

                ) {

                    this.selectedFruit = fruit;

                    fruit.dragging = true;

                    break;

                }

            }

        }

        // ==========================
        // ลากผลไม้
        // ==========================

        if (

            this.gesture.pinching &&
            this.selectedFruit

        ) {

            this.selectedFruit.x =
                fingerX -
                this.selectedFruit.size / 2;

            this.selectedFruit.y =
                fingerY -
                this.selectedFruit.size / 2;

        }

        // ==========================
        // ปล่อยผลไม้
        // ==========================

        if (

            this.gesture.justReleased &&
            this.selectedFruit

        ) {

            this.checkDrop();

        }

    }
        // ==========================
    // หน้าเริ่มเกม
    // ==========================

    if (!this.started) {

        this.drawStartScreen();

        requestAnimationFrame(() => this.loop());

        return;

    }

    // ==========================
    // วาดตะกร้า
    // ==========================

    this.leftBasket.draw(this.ctx);
    this.rightBasket.draw(this.ctx);

    // ==========================
    // อัปเดตผลไม้
    // ==========================

    if (!this.gameOver) {

        for (const fruit of this.fruits) {

            if (!fruit.dragging) {

                fruit.update();

            }

        }

    }

    // ==========================
    // วาดผลไม้
    // ==========================

    for (const fruit of this.fruits) {

        fruit.draw(this.ctx);

    }

    // ==========================
    // เอฟเฟกต์
    // ==========================

    for (const effect of this.effects) {

        effect.update();
        effect.draw(this.ctx);

    }

    this.effects =
        this.effects.filter(
            effect => !effect.dead
        );

    // ==========================
    // คะแนน
    // ==========================

    this.score.draw(this.ctx);

    // ==========================
    // เวลา
    // ==========================

    if (this.timer) {

        this.timer.draw(this.ctx);

        if (

            this.timer.time <= 0 &&
            !this.gameOver

        ) {

            this.gameOver = true;

            this.timer.stop();

            this.winAudio.currentTime = 0;
            this.winAudio.play();

        }

    }

    // ==========================
    // จบเกม
    // ==========================

    if (this.gameOver) {

        this.drawGameOver();

    }

    // ==========================
    // Loop
    // ==========================

    requestAnimationFrame(() => this.loop());

}
// ==========================
// หน้าเริ่มเกม
// ==========================

drawStartScreen() {

    this.ctx.fillStyle = "rgba(0,0,0,.65)";
    this.ctx.fillRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

    this.ctx.textAlign = "center";

    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 70px Arial";

    this.ctx.fillText(
        "🍎 เกมแยกคำประวิสรรชนีย์",
        this.canvas.width / 2,
        this.canvas.height / 2 - 120
    );

    this.ctx.font = "bold 34px Arial";

    this.ctx.fillText(
        "ใช้มือจีบผลไม้ แล้วลากลงตะกร้า",
        this.canvas.width / 2,
        this.canvas.height / 2 - 40
    );

    this.ctx.fillStyle = "#FFD700";
    this.ctx.font = "bold 30px Arial";

    this.ctx.fillText(
        "👆 คลิกที่หน้าจอเพื่อเริ่มเกม",
        this.canvas.width / 2,
        this.canvas.height / 2 + 50
    );

    this.ctx.textAlign = "left";

}

// ==========================
// หน้าสรุปผล
// ==========================

drawGameOver() {

    this.ctx.fillStyle = "rgba(0,0,0,.72)";
    this.ctx.fillRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

    this.ctx.textAlign = "center";

    // ถ้วยรางวัล
    this.ctx.font = "90px Arial";
    this.ctx.fillText(
        "🏆",
        this.canvas.width / 2,
        100
    );

    // หัวข้อ
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 58px Arial";

    this.ctx.fillText(
        "สรุปผลการเล่น",
        this.canvas.width / 2,
        170
    );

    // คะแนน
    this.ctx.font = "bold 40px Arial";

    this.ctx.fillText(
        "คะแนน : " + this.score.value,
        this.canvas.width / 2,
        240
    );

    // ตอบถูก
    this.ctx.fillStyle = "#7CFC00";

    this.ctx.fillText(
        "✅ ตอบถูก : " + this.correctCount,
        this.canvas.width / 2,
        300
    );

    // ตอบผิด
    this.ctx.fillStyle = "#FF6666";

    this.ctx.fillText(
        "❌ ตอบผิด : " + this.wrongCount,
        this.canvas.width / 2,
        360
    );

    // ดาว
    let stars = "";

    if (this.score.value >= 20) {

        stars = "⭐⭐⭐⭐⭐";

    } else if (this.score.value >= 15) {

        stars = "⭐⭐⭐⭐";

    } else if (this.score.value >= 10) {

        stars = "⭐⭐⭐";

    } else if (this.score.value >= 5) {

        stars = "⭐⭐";

    } else {

        stars = "⭐";

    }

    this.ctx.fillStyle = "#FFD700";
    this.ctx.font = "50px Arial";

    this.ctx.fillText(
        stars,
        this.canvas.width / 2,
        430
    );

    // ข้อความ
    let message = "";

    if (this.score.value >= 20) {

        message = "🌟 ยอดเยี่ยมมาก";

    } else if (this.score.value >= 15) {

        message = "🎉 เก่งมาก";

    } else if (this.score.value >= 10) {

        message = "😊 ดีมาก";

    } else if (this.score.value >= 5) {

        message = "👍 พยายามอีกนิด";

    } else {

        message = "💪 ลองอีกครั้ง";

    }

    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 36px Arial";

    this.ctx.fillText(
        message,
        this.canvas.width / 2,
        500
    );

    // เล่นใหม่
    this.ctx.fillStyle = "#FFD700";
    this.ctx.font = "bold 28px Arial";

    this.ctx.fillText(
        "คลิกที่หน้าจอเพื่อเล่นใหม่",
        this.canvas.width / 2,
        570
    );

    this.ctx.textAlign = "left";

}
}