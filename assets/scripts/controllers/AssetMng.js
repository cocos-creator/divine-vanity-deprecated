cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    init: function (cb) {
        this.wishesDB = {};
        cc.loader.loadRes('data/wishes.json', function(error, data){
            for (var i = 0; i < data.length; ++i) {
                if (data[i].id === "") break;
                this.wishesDB[data[i].id] = data[i];
            }
            if (cb) {
                cb();
            }
        }.bind(this));
    },

    getWishInfo: function (id) {
        return this.wishesDB[id];
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
