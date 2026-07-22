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
import strawberrySrc from "../assets/fruits/strawberry.png";
import watermelonSrc from "../assets/fruits/watermelon.png";
import starfruitSrc from "../assets/fruits/starfruit.png";
import gooseberrySrc from "../assets/fruits/gooseberry.png";
import stinkbeanSrc from "../assets/fruits/stinkbean.png";
import tamarindSrc from "../assets/fruits/tamarind.png";
import bittermelonSrc from "../assets/fruits/bittermelon.png";

function load(src) {
    const img = new Image();
    img.src = src;
    return img;
}

export default {

    apple: load(appleSrc),
    banana: load(bananaSrc),
    coconut: load(coconutSrc),
    durian: load(durianSrc),
    grape: load(grapeSrc),
    guava: load(guavaSrc),
    jackfruit: load(jackfruitSrc),
    lemon: load(lemonSrc),
    lime: load(limeSrc),
    longan: load(longanSrc),
    lychee: load(lycheeSrc),
    mango: load(mangoSrc),
    mangosteen: load(mangosteenSrc),
    orange: load(orangeSrc),
    papaya: load(papayaSrc),
    pineapple: load(pineappleSrc),
    pomelo: load(pomeloSrc),
    rambutan: load(rambutanSrc),
    strawberry: load(strawberrySrc),
    watermelon: load(watermelonSrc),
    starfruit: load(starfruitSrc),
    gooseberry: load(gooseberrySrc),
    stinkbean: load(stinkbeanSrc),
    tamarind: load(tamarindSrc),
    bittermelon: load(bittermelonSrc),

};