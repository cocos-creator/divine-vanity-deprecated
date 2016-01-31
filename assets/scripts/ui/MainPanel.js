
var Society = require('Society');

var MainPanel = cc.Class({
    extends: cc.Component,

    properties: {
        society: {
            default: null,
            type: Society
        },
        animCtrl: {
            default: null,
            type: cc.Animation
        },
        eyesNode: {
            default: null,
            type: cc.Node
        },
        startGameBtn: {
            default: null,
            type: cc.Animation
        },
        battlePanelAnim: {
            default: null,
            type: cc.Animation
        }

    },

    onLoad: function () {
        this.hasMoveScene = false;
        var scene = cc.director.getScene();
        scene.y = -1450;
    },

    hideMainPanelAnimEnd: function () {
        this.society.resume();
        this.battlePanelAnim.play('showBattlePanel');
    },

    runMoveScene: function () {
        var state = this.startGameBtn.getAnimationState('fadeInStartBtn');
        state.wrapMode = cc.WrapMode.Reverse;
        this.startGameBtn.play('fadeInStartBtn');
        this.hasMoveScene = true;
    },

    update: function (dt) {
        if (this.hasMoveScene) {
            var scene = cc.director.getScene();
            if (scene.y >= 0) {
                return;
            }
            scene.y += 300 * dt;
            this.eyesNode.y -= 300 * dt;
            if (scene.y > 0) {
                scene.y = 0;
                this.hasMoveScene = false;
                this.animCtrl.play('hideMainPanel');
            }
        }
    }

});
