var Skill = require('Skill');

cc.Class({
    extends: cc.Component,

    properties: {
        society: {
            default: null,
            type: cc.Node,
        },

        skillPrefab: {
            type: cc.Prefab,
            default: null
        },

        posePrefab: {
            type: cc.Prefab,
            default: null
        },

        skillList: {
            type: Skill,
            default: null
        }
    },

    onEnable: function () {
        var rituals = this.society.getComponent('Society').rituals;
        var wishes = Object.keys(rituals);
        var count = wishes.length;
        if (count === 0) {
            return;
        }
        var width = this.node.width / count;
        var height = this.node.height / 2;

        var x = (width - 39) / 2;
        var y = height / 2;
        for (var i = 0; i < count; ++i) {
            var wish = wishes[i];
            var ritual = rituals[wish];

            var pose = cc.instantiate(this.posePrefab);
            var skill = cc.instantiate(this.skillPrefab);

            skill.getComponent(cc.Sprite).spriteFrame = this.skillList.getComponent('Skill').sfIcons[wish];
            pose.getComponent(cc.Sprite).spriteFrame = pose.getComponent('FXSign').sfSigns[ritual.id];

            skill.x = x + i * width;
            pose.x = x + i * width;
            skill.y = y + skill.height;
            pose.y = y - pose.height;

            this.node.addChild(skill);
            this.node.addChild(pose);
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
