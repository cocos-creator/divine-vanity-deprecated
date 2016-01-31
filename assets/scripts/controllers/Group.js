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
        return (this.state === States.DEFAULT) && (this.people.length >= wish.ritualNeed);
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
                var person = this.people.splice(i, 1);
                learningGroup.addMember(person[0]);
            }
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
                    behavior.pray.getComponent(cc.Sprite).enabled = true;
                    behavior.pray.play('pray');
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
                    return a.x > b.x ? 1 : -1;
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
                var self = this;
                this.society.scheduleOnce(function () {
                    var lostCount = 0;
                    var array = [];
                    people.forEach((person, index) => {
                        var behavior = person.getComponent('HumanBehavior');
                        // Correct pose
                        if (praying || detail === behavior.currentPose) {
                            behavior.tribute = wish.tributePerP;
                            behavior.currentState = States.WORSHIPING;
                            array.push(person);
                        }
                        // Incorrect
                        else {
                            if (Math.random() < society.lostCoef) {
                                var behavior = person.getComponent('HumanBehavior');
                                behavior.currentState = States.LOST;
                                lostCount++;
                            }
                            else {
                                behavior.currentState = States.DEFAULT;
                                array.push(person);
                            }
                        }
                    });
                    self.people = array;
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
            var array = [];
            people.forEach((person, index) => {
                if (Math.random() < society.lostCoef) {
                    lostCount++;
                    var behavior = person.getComponent('HumanBehavior');
                    behavior.currentState = States.LOST;
                }
                else {
                    array.push(person);
                    person.getComponent('HumanBehavior').currentState = States.DEFAULT;
                }
            });
            self.people = array;
            if (lostCount > 0) {
                society.lost(lostCount);
            }
            society.rejointDefault(self);
        }, 0);
        this.active = false;
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
                var self = this;
                this.society.scheduleOnce(function () {
                    var lostCount = 0;
                    var array = [];
                    people.forEach((person, index) => {
                        if (Math.random() < society.prayCoef) {
                            lostCount++;
                            var behavior = person.getComponent('HumanBehavior');
                            behavior.currentState = States.LOST;
                        }
                        else {
                            array.push(person);
                            person.getComponent('HumanBehavior').currentState = States.DEFAULT;
                        }
                    });
                    self.people = array;
                    if (lostCount > 0) {
                        society.lost(lostCount);
                    }
                    society.rejointDefault(self);
                }, 0);
                this.active = false;
                this.state = States.DEFAULT;
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