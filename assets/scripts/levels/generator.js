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
            newbie.x = w * 0.2 + Math.floor(Math.random() * w * 0.6) - 96;
            newbie.y = this.y.length > 0 ? this.y[i % this.y.length] : 100;
            var zIndex = cc.winSize.height - newbie.y;
            newbie.opacity = 0;
            newbie.runAction(cc.fadeIn(1));
            society.host.addChild(newbie, zIndex);
            society.defaultGroup.addMember(newbie);
        }
        society.population += count;
        society.battlePanel.people.string = society.population;
    }
});
