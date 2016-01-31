cc.Class({
    extends: cc.Component,

    properties: {
        particle: cc.ParticleSystem,
        anim: cc.Animation,
        sfWonders: [cc.SpriteFrame]
    },

    playAnim (idx) {
        let sprite = this.anim.getComponent(cc.Sprite);
        sprite.spriteFrame = this.sfWonders[idx];
        sprite.enabled = true;
        this.anim.play('pop');
        this.particle.resetSystem();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
