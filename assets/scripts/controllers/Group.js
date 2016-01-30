require('../../ykl/global');

var Group = function () {
    this.people = [];
    this.state = States.DEFAULT;
    this.learnRitual = null;
    this.prayRitual = null;
};

cc.js.mixin(Group.prototype, {
    reuse: function () {
        this.people.length = 0;
        this.state = States.DEFAULT;
        this.learnRitual = null;
        this.prayRitual = null;
    },

    addMember: function (newbie) {
        if (this.state === States.DEFAULT) {
            this.people.push(newbie);
        }
    },

    canLearn: function (ritual) {
        return this.state === States.DEFAULT && this.people.length >= ritual.difficulty;
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

module.exports = Group;