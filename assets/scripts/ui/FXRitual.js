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

        var camera = cc.find('Camera');
        var lookAt = cc.find('Camera').getComponent('LookAt');

        lookAt.target = this.node;

        var action = cc.sequence([
            cc.scaleTo(0.5, 1.5, 1.5),
            cc.delayTime(2),
            cc.scaleTo(0.5, 1, 1),
        ]);
        camera.runAction( action );
    },

    playParticle () {
        this.particle.resetSystem();
        this.sign.show(this.signID);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
