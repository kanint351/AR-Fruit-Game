// src/game/Images.js

import appleSrc from "../assets/fruits/apple.png";
import bananaSrc from "../assets/fruits/banana.png";
import coconutSrc from "../assets/fruits/coconut.png";
import durianSrc from "../assets/fruits/durian.png";
import grapeSrc from "../assets/fruits/grape.png";
import guavaSrc from "../assets/fruits/guava.png";
import jackfruitSrc from "../assets/fruits/jackfruit.png";
import lemonSrc from "../assets/fruits/lemon.png";
import limeSrc from "../assets/fruits/lime.png";
import longanSrc from "../assets/fruits/longan.png";
import lycheeSrc from "../assets/fruits/lychee.png";
import mangoSrc from "../assets/fruits/mango.png";
import mangosteenSrc from "../assets/fruits/mangosteen.png";
import orangeSrc from "../assets/fruits/orange.png";
import papayaSrc from "../assets/fruits/papaya.png";
import pineappleSrc from "../assets/fruits/pineapple.png";
import pomeloSrc from "../assets/fruits/pomelo.png";
import rambutanSrc from "../assets/fruits/rambutan.png";
import starfruitSrc from "../assets/fruits/starfruit.png";
import gooseberrySrc from "../assets/fruits/gooseberry.png";
import stinkbeanSrc from "../assets/fruits/stinkbean.png";
import strawberrySrc from "../assets/fruits/strawberry.png";
import watermelonSrc from "../assets/fruits/watermelon.png";
import tamarindSrc from "../assets/fruits/tamarind.png";
import bittermelonSrc from "../assets/fruits/bittermelon.png";

function createImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

const Images = {

    apple: createImage(appleSrc),
    banana: createImage(bananaSrc),
    coconut: createImage(coconutSrc),
    durian: createImage(durianSrc),
    grape: createImage(grapeSrc),
    guava: createImage(guavaSrc),
    jackfruit: createImage(jackfruitSrc),
    lemon: createImage(lemonSrc),
    lime: createImage(limeSrc),
    longan: createImage(longanSrc),
    lychee: createImage(lycheeSrc),
    mango: createImage(mangoSrc),
    mangosteen: createImage(mangosteenSrc),
    orange: createImage(orangeSrc),
    papaya: createImage(papayaSrc),
    pineapple: createImage(pineappleSrc),
    pomelo: createImage(pomeloSrc),
    rambutan: createImage(rambutanSrc),
    starfruit: createImage(starfruitSrc),
    gooseberry: createImage(gooseberrySrc),
    stinkbean: createImage(stinkbeanSrc),
    strawberry: createImage(strawberrySrc),
    watermelon: createImage(watermelonSrc),
    tamarind: createImage(tamarindSrc),
    bittermelon: createImage(bittermelonSrc)

};

export default Images;

/**
 * โหลดรูปทั้งหมดก่อนเริ่มเกม
 */
export async function preloadImages() {

    const promises = Object.values(Images).map(img => {

        return new Promise(resolve => {

            if (img.complete) {

                resolve();

            } else {

                img.onload = resolve;
                img.onerror = resolve;

            }

        });

    });

    await Promise.all(promises);

    console.log("✅ Images Loaded");

}