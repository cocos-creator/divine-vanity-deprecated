cc.Class({
    extends: cc.Component,

    properties: {
        startBtnAnim: {
            default: null,
            type: cc.Animation
        },
        startBtn: cc.Node
    },

    eyesAnimEnd: function () {
        this.startBtn.active = true;
        this.startBtnAnim.play('fadeInStartBtn');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
