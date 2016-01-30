var MainPanel = require('MainPanel');

cc.Class({
    extends: cc.Component,

    properties: {
        mainPanel: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.skills = this.node.getComponent('Skills');
        this.resources = this.node.getComponent('Resources');
        this.society = this.node.getComponent('Society');

        this.mainPanel.on('skill-fired', this.skillFired, this);
    },

    skillFired: function (data) {
        this.society.skillFired(data.detail.skillID);
    },
});
