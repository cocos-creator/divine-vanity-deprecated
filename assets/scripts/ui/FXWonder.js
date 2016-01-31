cc.Class({
    extends: cc.Component,

    properties: {
        particle: cc.ParticleSystem,
        anim: cc.Animation,
        sprite: cc.Sprite,
        sfWonders: [cc.SpriteFrame]
    },

    playAnim (idx) {
        this.sprite.spriteFrame = this.sfWonders[idx];
        this.anim.play('pop');
        this.particle.resetSystem();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
