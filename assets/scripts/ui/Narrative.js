cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        durationPerLine: 0,
        textContents: {
            default: [],
            type: 'String',
            multiline: true
        },
        fadeDuration: 0
    },

    // use this for initialization
    onLoad: function () {

    },

    playLine (idx) {
        let actFadeOut = cc.fadeTo(this.fadeDuration, 0);
        let actFadeIn = cc.fadeTo(this.fadeDuration, 1);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
