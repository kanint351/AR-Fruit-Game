import {
    FilesetResolver,
    HandLandmarker
} from "@mediapipe/tasks-vision";

let handLandmarker = null;

export async function createHandDetector(){

    const vision = await FilesetResolver.forVisionTasks(

        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"

    );

    handLandmarker = await HandLandmarker.createFromOptions(

        vision,

        {

            baseOptions:{

                modelAssetPath:

                "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"

            },

            runningMode:"VIDEO",

            numHands:1

        }

    );

}

export function detectHands(video){

    if(!handLandmarker) return null;

    return handLandmarker.detectForVideo(

        video,

        performance.now()

    );

}