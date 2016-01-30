cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        sprite: cc.Sprite,
        sfIcons: [cc.SpriteFrame],
        skillID: {
            default: 0,
            type: cc.Integer,
            visible: false
        },
        cost: {
            default: 0,
            type: cc.Integer,
            visible: false
        },
        button: cc.Button,
        cooldown: 0
    },

    userSkill: function () {
        if (this.callback) {
            this.callback.call(this.target, this.skillID, this.cost);
            this.button.interactable = false;
            this.scheduleOnce(this.onButtonCooldown.bind(this), this.cooldown);
        }
    },

    onButtonCooldown () {
        var Resources = require('Resources');
        if (this.cost > Resources.instance.curPower) {
            return;
        }
        this.button.interactable = true;
    },

    updateSkill: function(skillInfo, callback, target) {
        this.skillID = skillInfo.id;
        this.cost = skillInfo.cost;
        this.label.string = this.cost;
        this.sprite.spriteFrame = this.sfIcons[this.skillID];
        this.callback = callback;
        this.target = target;
    }
});
