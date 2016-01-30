
var PowerBar = require('PowerBar');
var EffectMng = require('EffectMng');
var AudioMng = require('AudioMng');

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
        skillList: {
            default: null,
            type: cc.Node
        }
    },

    statics: {
        instance: null
    },

    onLoad: function () {
        MainPanel.instance = this;
        this.skills = [];
    },

    start: function () {
        this.instantiate();
    },

    useSkill: function (skillID, costValue) {
        this.node.emit("skill-fired", { "skillID": skillID });
        var Resources = require('Resources');
        Resources.instance.spendPower(costValue);
        this.chackBtnState(Resources);
        EffectMng.instance.play(skillID);
        AudioMng.instance.playWishSFX(skillID);
    },

    chackBtnState: function (resources) {
        for (let i = 0, len = this.skills.length; i < len; ++i) {
            var skill = this.skills[i];
            skill.button.interactable = skill.cost <= resources.instance.curPower;
        }
    },

    instantiate: function () {
        var Resources = require('Resources');
        var skillArr = this.skillList.getChildren();
        for (let i = 0, len = skillArr.length; i < len; ++i) {
            var skillInfo = { id: i, cost: 10 * (i + 1) };
            var skill = skillArr[i].getComponent('Skill');
            skill.updateSkill(skillInfo, this.useSkill, this);
            this.skills.push(skill);
        }
    },

    update: function (dt) {

    }
});
