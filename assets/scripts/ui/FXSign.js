cc.Class({
    extends: cc.Component,

    properties: {
        sprite: cc.Sprite,
        sfSigns: [cc.SpriteFrame]
    },

    onLoad () {
        this.sprite.enabled = false;
    },

    show (signID) {
        this.sprite.enabled = true;
        this.sprite.spriteFrame = this.sfSigns[signID];
        this.node.scale = 3;
        this.node.opacity = 0;
        let fadeIn = cc.fadeIn(0.3);
        let scaleDown = cc.scaleTo(0.5, 1);
        let callback = cc.callFunc(this.wait, this);
        this.node.runAction(cc.sequence(fadeIn, scaleDown, callback));
    },

    wait () {
        this.scheduleOnce(function () {
            let fadeOut = cc.fadeOut(0.5);
            this.node.runAction(fadeOut);
        }.bind(this), 1.5);
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});