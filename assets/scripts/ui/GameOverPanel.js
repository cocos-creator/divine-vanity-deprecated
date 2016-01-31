cc.Class({
    extends: cc.Component,

    properties: {
        society: {
            default: null,
            type: cc.Node
        },
        eyesAnimCtrl: {
            default: null,
            type: cc.Animation
        }
    },

    onLoad: function () {
        this.hasDown = false;
        this.node.active = false;
        this.node.on("touchstart", function (event) {
            event.stopPropagation();
        });
    },

    onEnable: function () {
        this.eyesAnimCtrl.play('hideEyes');
    },

    goToMainPanelClick: function () {
        if (this.hasDown) {
            return;
        }
        this.hasDown = true;
        cc.director.loadScene("game");
    }
});
