var BattlePanel = require('BattlePanel');
var Resources = require('Resources');

cc.Class({
    extends: cc.Component,

    properties: {
        battlePanel: {
            default: null,
            type: cc.Node
        },

        resources: {
            default: null,
            type: Resources
        },

        wonderPrefab: {
            default: null,
            type: cc.Prefab
        },

        wonderLayer: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.skills = this.node.getComponent('Skills');
        this.society = this.node.getComponent('Society');

        this.battlePanel.on('skill-fired', this.skillFired, this);
    },

    tribute: function (value) {
        this.resources.addPower(value);
    },

    skillFired: function (data) {
        this.society.skillFired(data.detail.skillID);
    },

    showWonder: function (id) {
        let wonder = cc.instantiate(this.wonderPrefab);
        this.wonderLayer.addChild(wonder);
        wonder.x = cc.randomMinus1To1() * 350;
        wonder.getComponent('FXWonder').playAnim(id);
    }
});
