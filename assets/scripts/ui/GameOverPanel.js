cc.Class({
    extends: cc.Component,

    properties: {
        society: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        this.node.active = false;
        this.node.on('population-out', function () {
            this.node.active = true;
        }.bind(this));

        this.node.on("touchstart", function (event) {
            event.stopPropagation();
        });
    },

    goToMainPanelClick: function () {
        cc.director.loadScene("main");
    }
});
