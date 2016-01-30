cc.Class({
    extends: cc.Component,

    properties: {
        population: 3,

        y: {
            type: [cc.Integer],
            default: []
        },

        // Person prefab for generating people
        person: {
            default: null,
            type: cc.Prefab
        },
    },

    // use this for initialization
    onLoad: function () {
        this.society = this.getComponent('Society');

        this.generate(this.population);
    },

    generate: function (count) {
        var society = this.society;
        if (!society.host) {
            return;
        }
        for (var i = 0; i < count; ++i) {
            var newbie = cc.instantiate(this.person);
            // Random between [50, width-100)
            var w = cc.winSize.width;
            newbie.x = w * 0.1 + Math.floor(Math.random() * w * 0.8);
            newbie.y = this.y.length > 0 ? this.y[i % this.y.length] : 100;
            newbie.zIndex = newbie.y;
            society.host.addChild(newbie);
            society.defaultGroup.addMember(newbie);
        }
        society.population += count;
        society.mainPanel.people.string = society.population;
    },
});
