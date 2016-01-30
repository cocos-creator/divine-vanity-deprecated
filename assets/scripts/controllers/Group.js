var Group = function () {
    this.people = [];
    this.state = Group.State.DEFAULT;
    this.learnRitual = null;
    this.askRitual = null;
};

cc.js.mixin(Group.prototype, {
    reuse: function () {
        this.people.length = 0;
        this.state = Group.State.DEFAULT;
        this.learnRitual = null;
        this.askRitual = null;
    },

    addMember: function (newbie) {
        if (this.state === Group.State.DEFAULT) {
            this.people.push(newbie);
        }
    },

    canLearn: function (ritual) {
        return this.state === Group.State.DEFAULT && this.people.length >= ritual.difficulty;
    },

    isLearning: function () {
        return (this.learnRitual !== null);
    },

    learn: function (ritual, learningGroup) {
        if (this.canLearn(ritual)) {
            var leftCount = this.people.length - ritual.difficulty;
            for (var i = this.people.length-1; i >= leftCount; --i) {
                learningGroup.push(this.people[i]);
            }
            this.people.length = leftCount;
            return true;
        }
        return false;
    },

    toState: function (state) {
        if (state !== this.state) {
            this.state = state;
        }
    }
});

Group.State = cc.Enum({
    DEFAULT: 0,
    LEARNING: 1,
    DOUBTING: 2,
    CONFIRMING: 3,
    WORSHIPING: 4,
    ASKING: 5,
    LOST: 6
});

module.exports = Group;