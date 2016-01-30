var MainPanel = cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {

    },

    runGameClick: function () {
        cc.director.loadScene("game");
    }
});
