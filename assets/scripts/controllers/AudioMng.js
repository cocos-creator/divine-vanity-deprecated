var AudioMng = cc.Class({
    extends: cc.Component,

    properties: {
        bgm: {
            default: null,
            url: cc.AudioClip
        },
        ritual: {
            default: null,
            url: cc.AudioClip
        },
        baby: {
            default: null,
            url: cc.AudioClip
        },
        wishSFX: {
            default: [],
            url: cc.AudioClip
        }
    },

    statics: {
        instance: null
    },

    playBGM () {
        cc.audioEngine.playMusic(this.bgm, true);
    },

    playRitual () {
        cc.audioEngine.playEffect(this.ritual, false);
    },

    playBaby () {
        cc.audioEngine.playEffect(this.baby, false);
    },

    playWishSFX (wishType) {
        if (wishType < this.wishSFX.length) {
            cc.audioEngine.playEffect(this.wishSFX[wishType], false);
        }
    },

    onLoad () {
        AudioMng.instance = this;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
