var Ritual = require('Ritual');
var FXSign = require('FXSign');

cc.Class({
    extends: cc.Component,

    properties: {
        rituals: {
            type: [cc.Node],
            default: []
        },
        sign: FXSign
    },

    activateRitual: function (wish, pose) {
        var ritual = this.rituals[wish];
        var poseComp = ritual.getChildByName('pose').getComponent(cc.Sprite);
        poseComp.spriteFrame = this.sign.sfSigns[pose];
    },

    close: function () {
        this.node.active = false;
    }
});
