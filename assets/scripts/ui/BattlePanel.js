
var PowerBar = require('PowerBar');
var EffectMng = require('EffectMng');
var AudioMng = require('AudioMng');

var BattlePanel = cc.Class ({
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
        BattlePanel.instance = this;
        this.skills = [];
    },

    start: function () {
        this.instantiate();
        this.unlockBtn(0);

        this.state = 0;
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.b:
                        self.state++;
                        if (self.state > 2) {
                            self.state = 0;
                        }
                        self.unlockBtn(self.state);
                        break;
                }
            }
        }, this.node);
    },

    useSkill: function (skillID, costValue) {
        this.node.emit("skill-fired", { "skillID": skillID });
        var Resources = require('Resources');
        Resources.instance.spendPower(costValue);
        this.chackBtnState(Resources);
        EffectMng.instance.play(skillID);
        AudioMng.instance.playWishSFX(skillID);
    },

    // 按钮状态 是否禁用
    chackBtnState: function (resources) {
        for (let i = 0, len = this.skills.length; i < len; ++i) {
            var skill = this.skills[i];
            skill.button.interactable = skill.cost <= resources.instance.curPower;
        }
    },

    unlockBtn: function (state) {
        var current = 0;
        for (let i = 0, len = this.skills.length; i < len; ++i) {
            // this.skills[i].node.active = false;
            if (this.skills[i].node.active) {
                current = i;
            }
            else {
                break;
            }
        }

        var unlocked = [];
        var firstPosX = 200 - (state * 100);
        for (let i = current + 1; i <= state; i++) {
            var skill = this.skills[i];
            skill.node.x = firstPosX + (100 * i);
            skill.node.active = true;
            unlocked.push(i);
        }
        return unlocked;
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
    }
});
