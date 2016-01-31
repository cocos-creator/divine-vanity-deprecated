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
        this.node.active = false;
        this.node.on("touchstart", function (event) {
            event.stopPropagation();
        });
    },

    onEnable: function () {
        this.eyesAnimCtrl.play('showBattlePanel');
    },

    goToMainPanelClick: function () {
        cc.director.loadScene("game");
    }
});
