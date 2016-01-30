cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    init: function (cb) {
        this.wishesDB = {};
        let url = cc.url.raw('data/wishes.json');
        cc.loader.loadJson(url, function(error, data){
            for (var i = 0; i < data.length; ++i) {
                if (data[i].id === "") break;
                this.wishesDB[data[i].id] = data[i];
            }
            console.log(this.wishesDB);
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
