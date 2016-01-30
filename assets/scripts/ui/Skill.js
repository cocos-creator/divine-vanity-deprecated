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
        costValue: {
            default: 0,
            type: cc.Integer,
            visible: false
        },
        button: cc.Button,
        cooldown: 0
    },

    userSkill: function () {
        if (this.callback) {
            this.callback.call(this.target, this.skillID, this.costValue);
            this.button.interactable = false;
            this.scheduleOnce(this.onButtonCooldown.bind(this), this.cooldown);
        }
    },

    onButtonCooldown () {
        this.button.interactable = true;
    },

    updateSkill: function(skillInfo, callback, target) {
        this.skillID = skillInfo.id;
        this.costValue = skillInfo.cost;
        this.label.string = this.costValue;
        this.sprite.spriteFrame = this.sfIcons[this.skillID];
        this.callback = callback;
        this.target = target;
    }
});
