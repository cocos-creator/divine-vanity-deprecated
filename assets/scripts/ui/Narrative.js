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
        this.currentTextId = 0;
        this.node.opacity = 0;
        // let idx = 0;
        // this.schedule(function() {
        //     this.playLine(idx);
        //     idx++;
        // }.bind(this), this.durationPerLine, 4, 0);
    },

    playLine (idx) {
        this.currentTextId = idx;
        let actFadeOut = cc.fadeOut(this.fadeDuration);
        let actFadeIn = cc.fadeIn(this.fadeDuration);
        let callback = cc.callFunc(this.switchText, this);
        let seq = cc.sequence(actFadeOut, callback, actFadeIn);
        this.node.runAction(seq);
    },

    switchText () {
        this.label.string = this.textContents[this.currentTextId];
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
