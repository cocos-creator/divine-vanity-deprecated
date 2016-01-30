cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        skillID: 0
    },

    userSkill: function () {
        if (this.callback) {
            this.callback(this.skillID);
        }
    },

    updateSkill: function(skillId, skillName, callback) {
        this.skillID = skillId;
        this.label.string = skillName;
        this.callback = callback;
    }
});
