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
        }
    },

    userSkill: function () {
        if (this.callback) {
            this.callback(this.skillID, this.costValue);
        }
    },

    updateSkill: function(skillInfo, callback) {
        this.skillID = skillInfo.id;
        this.costValue = skillInfo.cost;
        this.label.string = this.costValue;
        this.sprite.spriteFrame = this.sfIcons[this.skillID];
        this.callback = callback;
    }
});
