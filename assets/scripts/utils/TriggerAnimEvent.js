cc.Class({
    extends: cc.Component,

    properties: {
        startBtnAnim: {
            default: null,
            type: cc.Animation
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    eyesAnimEnd: function () {
        this.startBtnAnim.play('fadeInStartBtn');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
