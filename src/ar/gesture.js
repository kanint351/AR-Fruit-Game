export default class Gesture {

    constructor() {

        this.pinching = false;
        this.justPinched = false;
        this.justReleased = false;

    }

    update(hand) {

        this.justPinched = false;
        this.justReleased = false;

        if (!hand) {

            if (this.pinching) {
                this.pinching = false;
                this.justReleased = true;
            }

            return;

        }

        // นิ้วโป้ง
        const thumb = hand[4];

        // ปลายนิ้วชี้
        const index = hand[8];

        const dx = thumb.x - index.x;
        const dy = thumb.y - index.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        // ระยะจีบ
        if (distance < 0.05) {

            if (!this.pinching) {

                this.pinching = true;
                this.justPinched = true;

            }

        } else {

            if (this.pinching) {

                this.pinching = false;
                this.justReleased = true;

            }

        }

    }

}