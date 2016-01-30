cc.Class({
    extends: cc.Component,

    properties: {
        particle: cc.ParticleSystem,
        anim: cc.Animation,
        sign: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.sign = this.sign.getComponent('FXSign');
        this.signID = -1;
    },

    playAnim (signID) {
        this.signID = signID;
        this.anim.play('play_ritual');
    },

    playParticle () {
        this.particle.resetSystem();
        this.sign.show(this.signID);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
