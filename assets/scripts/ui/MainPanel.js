
var Society = require('Society');
var AudioMng = require('AudioMng');
var Narrative = require('Narrative');

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
        },
        narrative: Narrative
    },

    onLoad: function () {
        this.hasMoveScene = false;
        var scene = cc.director.getScene();
        scene.y = -1450;
        this.narrative.playLine(0);
    },

    hideMainPanelAnimEnd: function () {
        this.society.resume();
        this.battlePanelAnim.play('showBattlePanel');
    },

    runMoveScene: function () {
        var state = this.startGameBtn.getAnimationState('fadeInStartBtn');
        state.wrapMode = cc.WrapMode.Reverse;
        AudioMng.instance.playBGM();
        this.society.narrative.playLine(1);
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
