import Basket from "./Basket.js";
import Fruit from "./Fruit.js";
import Score from "./Score.js";
import Timer from "./Timer.js";
import Input from "./Input.js";
import Renderer from "./Renderer.js";
import Drag from "./Drag.js";
import GameLogic from "./GameLogic.js";
import UI from "./UI.js";
import { WORDS } from "../data/words.js";
import Lives from "./Lives.js";
import { enterFullscreen } from "./Fullscreen.js";

export default class Game {

    constructor() {

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    document.body.style.background = "#87CEEB";

    this.canvas.style.display = "block";
    this.canvas.style.touchAction = "none";
    this.canvas.style.userSelect = "none";

    this.pointer = {
        x: 0,
        y: 0,
        down: false
    };

    this.started = false;
    this.gameOver = false;
    this.win = false;

    this.dragFruit = null;
    this.ui = null;

    this.score = new Score(this);
    this.timer = new Timer(this, 60);
    this.lives = new Lives(this);
    

    this.effects = [];

this.animationId = null;

// สร้างตะกร้าก่อน
this.createObjects();

// แล้วค่อยคำนวณขนาดหน้าจอ
this.resize();

this.renderer = new Renderer(this);

this.ui = new UI(this);

this.drag = new Drag(this);

this.logic = new GameLogic(this);

this.input = new Input(this);

this.bindResize();

this.loop();

}

    

    bindResize(){

        window.addEventListener(
            "resize",
            ()=>this.resize()
        );

    }

    resize() {

    const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width =
        Math.floor(this.width * dpr);

    this.canvas.height =
        Math.floor(this.height * dpr);

    this.canvas.style.width =
        this.width + "px";

    this.canvas.style.height =
        this.height + "px";

    this.ctx.setTransform(
        1,
        0,
        0,
        1,
        0,
        0
    );

    this.ctx.scale(dpr, dpr);

    if (this.leftBasket) {

        this.layout();

    }

    if (this.fruits) {

        const fruitCount =
            this.width < 600
                ? 4
                : this.width < 900
                ? 5
                : 6;

        while (
            this.fruits.length < fruitCount
        ) {

            this.fruits.push(
                new Fruit(this)
            );

        }

        while (
            this.fruits.length > fruitCount
        ) {

            this.fruits.pop();

        }

        this.fruits.forEach(fruit => {

            fruit.size = Math.max(
                65,
                Math.min(
                    this.width * 0.08,
                    110
                )
            );

        });

    }

}

    layout() {

    const basketWidth = Math.min(
        this.width * 0.32,
        360
    );

    const basketHeight = Math.max(
        this.height * 0.10,
        90
    );

    const margin = Math.max(
        20,
        this.width * 0.03
    );

    const bottom = Math.max(
        18,
        this.height * 0.025
    );

    this.leftBasket.resize(

        margin,

        this.height -
        basketHeight -
        bottom,

        basketWidth,

        basketHeight

    );

    this.rightBasket.resize(

        this.width -
        basketWidth -
        margin,

        this.height -
        basketHeight -
        bottom,

        basketWidth,

        basketHeight

    );

}
        createObjects(){

    this.leftBasket = new Basket(
        0,
        0,
        0,
        0,
        "ประวิสรรชนีย์",
        "#2ecc71"
    );

    this.rightBasket = new Basket(
        0,
        0,
        0,
        0,
        "ไม่ประวิสรรชนีย์",
        "#e74c3c"
    );

    

    this.fruits = [];

    const width = window.innerWidth;

const fruitCount =
    width < 600
        ? 4
        : width < 900
        ? 5
        : 6;

this.fruits = [];

for (let i = 0; i < fruitCount; i++) {

    this.fruits.push(new Fruit(this));

}
    
}
startGame() {

    enterFullscreen();

    this.logic.start();

}
loop() {

    this.logic.update();

    this.renderer.render();

    this.animationId =
        requestAnimationFrame(
            () => this.loop()
        );

}
}
