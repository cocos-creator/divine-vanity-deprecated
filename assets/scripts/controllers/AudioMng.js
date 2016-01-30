cc.Class({
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
        wishSFX: {
            default: [],
            url: cc.AudioClip
        }
    },

    playBGM () {
        cc.audioEngine.playMusic(this.bgm, true);
    },

    playRitual () {
        cc.audioEngine.playEffect(this.ritual, false);
    },

    playWishSFX (wishType) {
        cc.audioEngine.playEffect(this.wishSFX[wishType], false);
    },

    onLoad () {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
