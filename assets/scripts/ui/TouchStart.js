cc.Class({
    extends: cc.Component,

    properties: {
        mask: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.node.runAction(cc.repeatForever(cc.sequence(cc.fadeOut(1), cc.fadeIn(1))));
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                // don't capture the event
                return true;
            },
            onTouchEnded: function(touch, event) {
                this.mask.runAction(cc.fadeIn(1));
                cc.director.loadScene('game');
            }.bind(this)
        }, this);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
