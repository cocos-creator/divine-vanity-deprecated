require('../../ykl/global');

function randomArrayItems(arr, num) {
    var temp = [];
    for (var index in arr) {
        temp.push(arr[index]);
    }

    var results = [];
    for (var i = 0; i < num; i++) {
        if (temp.length > 0) {
            var arrIndex = Math.floor( Math.random() * temp.length );
            results[i] = temp[arrIndex];
            temp.splice(arrIndex, 1);
        } else {
            break;
        }
    }
    return results;
}

var Group = function (society) {
    this.people = [];
    this.unuse();
    this.reuse(society);
};

cc.js.mixin(Group.prototype, {
    unuse: function () {
        this.society = null;
        this.people.length = 0;
        this.state = States.DEFAULT;
        this.wish = null;
        this.poses = null;
        this.prayRitual = null;
        this.countdown = 0;
        this.active = false;
    },

    reuse: function (society) {
        this.society = society;
        this.active = true;
    },

    addMember: function (newbie) {
        if (this.state === States.DEFAULT) {
            this.people.push(newbie);
        }
    },

    canLearn: function (wish) {
        return this.state === States.DEFAULT && this.people.length >= wish.ritualNeed;
    },

    isLearning: function () {
        return (this.wish !== null);
    },

    split: function (wish, learningGroup) {
        if (this.canLearn(wish)) {
            var leftCount = this.people.length - wish.ritualNeed;
            for (var i = this.people.length-1; i >= leftCount; --i) {
                learningGroup.addMember(this.people[i]);
            }
            this.people.length = leftCount;
            return true;
        }
        return false;
    },

    toState: function (state, detail) {
        if (state !== this.state) {
            this.state = state;
            switch (state) {
            case States.LEARNING:
                // Init learning
                this.poses = randomArrayItems(UnusedPoses, this.wish.poseCount);
                this.people.forEach((person) => {
                    var behavior = person.getComponent('HumanBehavior');
                    behavior.currentState = States.LEARNING;
                    behavior.currentWish = this.wish;
                    behavior.currentPose = this.poses[Math.floor(Math.random() * this.poses.length)];
                });
                this.countdown = this.wish.poseDuration;
                break;
            case States.WORSHINPING:
                // Not learning anymore
                this.poses.length = 0;
                var people = this.people;
                var society = this.society;
                people.forEach((person, index) => {
                    var behavior = person.getComponent('HumanBehavior');
                    var lostCount = 0;
                    // Correct pose
                    if (detail === behavior.currentPose) {
                        behavior.currentState = States.WORSHINPING;
                    }
                    // Incorrect
                    else {
                        if (Math.random() < society.lostCoef) {
                            behavior.currentState = States.LOST;
                            delete people[index];
                            lostCount++;
                        }
                    }
                    society.lost(lostCount);
                });
                this.wish = null;
                this.countdown = 3;
                break;
            }
        }
    },
    
    update: function (dt) {
        if (this.countdown > 0) {
            this.countdown -= dt;
        }
        else {
            this.countdown = 0;
            switch (this.state) {
            case States.LEARNING:
                // Switch pose
                this.people.forEach((person) => {
                    var behavior = person.getComponent('HumanBehavior');
                    if (!behavior.checked) {
                        var prevPose = this.poses.indexOf(behavior.currentPose), poseId;
                        do {
                            poseId = Math.floor(Math.random() * this.poses.length);
                        } while (poseId === prevPose && this.poses.length > 1);
                        behavior.currentPose = this.poses[poseId];
                    }
                });
                this.countdown = this.wish.poseDuration;
                break;
            case States.WORSHINPING:
                this.people.forEach((person) => {
                    var behavior = person.getComponent('HumanBehavior');
                    behavior.currentState = States.DEFAULT;
                });
                this.state = States.DEFAULT;
                this.society.rejointDefault(this);
                break;
            }
        }
    }
});

module.exports = Group;