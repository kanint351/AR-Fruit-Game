export async function startCamera(video) {

    const stream = await navigator.mediaDevices.getUserMedia({

        video: {
            facingMode: "user"
            // ถ้าใช้กล้องหลัง เปลี่ยนเป็น "environment"
        },

        audio: false

    });

    video.srcObject = stream;

    await video.play();

}