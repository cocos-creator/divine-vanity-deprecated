cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView
    },

    // use this for initialization
    startScroll: function () {

    },

    onEnable () {
        this.isInit = true;
        this.scheduleOnce(this.scrollDown, 2);
    },

    scrollDown () {
        this.scrollView.scrollToBottom(10, false);
    },

    hide () {
        this.node.active = false;
        this.unschedule(this.scrollDown);
        this.isInit = true;
    },

    // called every frame, uncomment this function to activate update callback
    update (dt) {
        if (this.isInit) {
            this.scrollView.scrollToTop();
            this.isInit = false;
        }
    }
});
