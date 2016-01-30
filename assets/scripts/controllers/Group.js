require('../../ykl/global');

var Group = function () {
    this.people = [];
    this.state = States.DEFAULT;
    this.wish = null;
    this.prayRitual = null;
};

cc.js.mixin(Group.prototype, {
    reuse: function () {
        this.people.length = 0;
        this.state = States.DEFAULT;
        this.wish = null;
        this.prayRitual = null;
    },

    addMember: function (newbie) {
        if (this.state === States.DEFAULT) {
            this.people.push(newbie);
        }
    },

    canLearn: function (wish) {
        return this.state === States.DEFAULT && this.people.length >= wish.difficulty;
    },

    isLearning: function () {
        return (this.wish !== null);
    },

    learn: function (wish, learningGroup) {
        if (this.canLearn(wish)) {
            var leftCount = this.people.length - wish.ritualNeed;
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