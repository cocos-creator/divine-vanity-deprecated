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
        this.praying = false;
        this.prayRitual = null;
        this.countdown = 0;
        this.active = false;
        this.learning = false;
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
        return (this.learning === true);
    },

    isPraying: function () {
        return (this.praying === true);
    },

    split: function (wish, learningGroup) {
        if (this.canLearn(wish)) {
            var need = wish.ritualNeed + Math.ceil(Math.random() * 2);
            var leftCount = this.people.length - need;
            leftCount < 0 && (leftCount = 0);
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
            case States.PRAYING:
                var ritual = this.society.rituals[this.wish.id];
                this.people.forEach((person, index) => {
                    var behavior = person.getComponent('HumanBehavior');
                    behavior.currentState = States.PRAYING;
                    behavior.currentWish = this.wish;
                    behavior.currentPose = ritual.pose;
                });
                this.countdown = this.wish.poseDuration;
                this.prayRitual = ritual.pose;
                this.praying = true;
                break;
            case States.LEARNING:
                // Init learning
                this.poses = randomArrayItems(UnusedPoses, this.wish.poseCount);
                this.people.forEach((person, index) => {
                    var behavior = person.getComponent('HumanBehavior');
                    behavior.currentState = States.LEARNING;
                    behavior.currentWish = this.wish;
                    behavior.currentPose = this.poses[index % this.poses.length];
                });

                // 当 people 间距太小时，将 间距做一定调整
                var people = this.people.sort(function (a, b) {
                    return a.x > b.x;
                });

                var lastX = null;
                for (var i = 0, l = people.length; i < l; i++) {
                    if (i === 0) {
                        lastX = people[i].x;
                        continue;
                    }

                    var x = people[i].x;

                    if (x - lastX < 50) {
                        people[i].runAction( cc.moveTo(0.3, lastX + 50, people[i].y) );
                        lastX += 50;
                    }
                    else {
                        lastX = x;
                    }
                }

                this.countdown = this.wish.poseDuration;
                this.learning = true;
                break;
            case States.WORSHIPING:
                // Not learning anymore
                this.poses && (this.poses.length = 0);
                var wish = this.wish;
                var people = this.people;
                var society = this.society;
                var praying = this.praying;
                this.society.scheduleOnce(function () {
                    var lostCount = 0;
                    people.forEach((person, index) => {
                        var behavior = person.getComponent('HumanBehavior');
                        // Correct pose
                        if (praying || detail === behavior.currentPose) {
                            behavior.tribute = wish.tributePerP;
                            behavior.currentState = States.WORSHIPING;
                        }
                        // Incorrect
                        else {
                            if (Math.random() < society.lostCoef) {
                                behavior.currentState = States.LOST;
                                delete people[index];
                                lostCount++;
                            }
                            else {
                                behavior.currentState = States.DEFAULT;
                            }
                        }
                    });
                    if (lostCount > 0) {
                        society.lost(lostCount);
                    }
                }, 0);
                this.wish = null;
                if (this.isLearning) {
                    this.countdown = 4.5;
                }
                else {
                    this.countdown = 2;
                }
                break;
            }
        }
    },

    punish: function () {
        var people = this.people;
        var society = this.society;
        var self = this;
        this.society.scheduleOnce(function () {
            var lostCount = 0;
            people.forEach((person, index) => {
                var behavior = person.getComponent('HumanBehavior');
                if (Math.random() < society.lostCoef) {
                    behavior.currentState = States.LOST;
                    delete people[index];
                    lostCount++;
                }
                else {
                    behavior.currentState = States.DEFAULT;
                }
            });
            if (lostCount > 0) {
                society.lost(lostCount);
            }
            society.rejointDefault(self);
        }, 0);
        this.state = States.DEFAULT;
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
            case States.PRAYING:
                var people = this.people;
                var society = this.society;
                this.society.scheduleOnce(function () {
                    var lostCount = 0;
                    people.forEach((person, index) => {
                        var behavior = person.getComponent('HumanBehavior');
                        if (Math.random() < society.prayCoef) {
                            behavior.currentState = States.LOST;
                            delete people[index];
                            lostCount++;
                        }
                        else {
                            behavior.currentState = States.DEFAULT;
                        }
                    });
                    if (lostCount > 0) {
                        society.lost(lostCount);
                    }
                }, 0);
                this.state = States.DEFAULT;
                this.society.rejointDefault(this);
                break;
            case States.WORSHIPING:
                var behaviors = [];
                this.people.forEach((person) => {
                    var behavior = person.getComponent('HumanBehavior');
                    behaviors.push(behavior);
                });
                this.society.scheduleOnce(function () {
                    for (var i = 0; i < behaviors.length; ++i) {
                        behaviors[i].currentState = States.DEFAULT;
                    }
                }, 0);
                this.state = States.DEFAULT;
                this.society.rejointDefault(this);
                break;
            }
        }
    }
});

module.exports = Group;