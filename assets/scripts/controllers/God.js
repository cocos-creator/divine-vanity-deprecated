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
        }
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
});
