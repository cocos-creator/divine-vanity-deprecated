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
            type: cc.SpriteFrame
        }
    },

    playBGM () {
        cc.audioEngine.playMusic(this.bgm, true);
    },

    playRitual () {
        cc.audioEngine.playEffect(this.ritual, false);
    },

    playWishSFX (wishType) {
        cc.audioEngine.playEffect(wishType, false);
    },

    onLoad () {
        this.test();
    },

    test () {
        this.playBGM();
        var idx = 0;
        this.schedule(function() {
            // this.playWishSFX(idx);
            this.playRitual();
        }.bind(this), 5, 3, 2.5);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
