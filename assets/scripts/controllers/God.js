cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        this.skills = this.node.getComponent('Skills');
        this.resources = this.node.getComponent('Resources');
    },
});
