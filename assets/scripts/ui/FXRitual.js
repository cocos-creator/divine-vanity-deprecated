cc.Class({
    extends: cc.Component,

    properties: {
        particle: cc.ParticleSystem,
        anim: cc.Animation
    },

    // use this for initialization
    onLoad: function () {

    },

    playAnim () {
        this.anim.play('play_ritual');
    },

    playParticle () {
        this.particle.resetSystem();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
