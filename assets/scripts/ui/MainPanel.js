
var PowerBar = require('PowerBar');

var MainPanel = cc.Class ({
    extends: cc.Component,

    properties: {
        people: {
            default: null,
            type: cc.Label
        },

        power: {
            default: null,
            type: PowerBar
        },
        skillTemplate: {
            default: null,
            type: cc.Prefab
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        spawnCount: 0,
        spacing: 0
    },

    statics: {
        instance: null
    },

    onLoad: function () {
        MainPanel.instance = this;
    },

    start: function () {
        this.content = this.scrollView.content;
        this.skills = [];
        this.instantiate();
    },

    useSkill: function (skillID, costValue) {
        this.node.emit("skill-fired", { "skillID": skillID });
        var Resources = require('Resources');
        Resources.instance.spendPower(costValue);
    },

    instantiate: function () {
        var Resources = require('Resources');
        for (let i = 0; i < this.spawnCount; ++i) {
            let item = cc.instantiate(this.skillTemplate);
            if (i === 0) {
                this.content.height = this.spawnCount * (item.height + this.spacing) + this.spacing;
            }
            this.content.addChild(item);
            item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            item.getComponent('Skill').updateSkill({
                id: i,
                cost: 10*(i+1)
            }, this.useSkill, this);
            this.skills.push(item);
        }
    },

    update: function (dt) {

    }
});
