export default class Lives {

    constructor(game) {

        this.game = game;

        this.max = 3;
        this.value = 3;

    }

    //---------------------------------
    // รีเซ็ตหัวใจ
    //---------------------------------

    reset() {

        this.value = this.max;

    }

    //---------------------------------
    // ลดหัวใจ
    //---------------------------------

    lose() {

        if (this.value > 0) {

            this.value--;

        }

    }

    //---------------------------------
    // ตรวจว่าหมดหัวใจหรือยัง
    //---------------------------------

    isDead() {

        return this.value <= 0;

    }

    

}

