cc.Class({
    extends: cc.Component,

    properties: {
        particle: cc.ParticleSystem,
        anim: cc.Animation,
    },

    playAnim (idx) {
        switch (idx) {
            case 0:
                this.anim.play('pop');
                this.node.y -= cc.random0To1() * 80;
                this.node.scale *= cc.random0To1() * 0.3 + 1;
                break;
            case 1:
                this.anim.play('empty');
                this.node.y += cc.random0To1() * 100;
                break;
            case 2:
                this.anim.play('pop_maya');
                this.node.y += cc.random0To1() * 60;
                this.node.scale *= cc.random0To1() * 0.3 + 1;
                break;
            case 3:
                this.anim.play('pop_egypt');
                this.node.y += cc.random0To1() * 80;
                break;
            case 4:
                this.anim.play('pop');
                break;
        }
        // this.anim.play('pop');
        this.particle.resetSystem();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
