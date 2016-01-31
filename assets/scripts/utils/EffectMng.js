var EffectMng = cc.Class ({
    extends: cc.Component,

    properties: {
        fxRain: {
            default: null,
            type: cc.ParticleSystem
        },
        fxMeta: {
            default: null,
            type: cc.ParticleSystem
        },
        fxFire: {
            default: null,
            type: cc.Animation
        },
        fxSun: {
            default: null,
            type: cc.Animation
        },
        fxWheat: {
            default: null,
            type: cc.Animation
        }
    },

    statics: {
        instance: null
    },

    onLoad: function () {
        EffectMng.instance = this;
    },

    play: function (skillID) {
        switch (skillID) {
            case 0: // 水
                this.fxRain.enabled  = true;
                this.fxRain.resetSystem();
                break;
            case 1: // 火
                this.fxFire.play('fx_lightning');
                break;
            case 2: // 肉
                this.fxMeta.enabled  = true;
                this.fxMeta.resetSystem();
                break;
            case 3: // 阳光
                this.fxSun.play('fx_sun');
                break;
            case 4: // 麦子
                this.fxFire.play('fx_wheat');
                break;
        }
    },

    update: function (dt) {

    }
});
