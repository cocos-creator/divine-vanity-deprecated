cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        skillID: 0,
        costValue: 0
    },

    userSkill: function () {
        if (this.callback) {
            this.callback(this.skillID, this.costValue);
        }
    },

    updateSkill: function(skillId, skillInfo, callback) {
        this.skillID = skillId;
        var info = skillInfo.split('|');
        this.label.string = info[0];
        this.costValue = parseInt(info[1]);
        this.callback = callback;
    }
});
