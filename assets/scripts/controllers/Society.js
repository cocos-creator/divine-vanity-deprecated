require('../../ykl/global');
var Group = require('Group');
var Wish = require('../Wish');
var BattlePanel = require('BattlePanel');
var FXRitual = require('FXRitual');

var wishTypeList = cc.Enum.getList(WishType);
var Wishes = {};
var PopulationLevel = [3, 5, 8, 15, 25, 35, 45];
var Levels = {};
for (var i = 0; i < wishTypeList.length; ++i) {
    var id = wishTypeList[i].value;
    Wishes[id] = new Wish();
    Wishes[id].id = id;
    Levels[PopulationLevel[i]] = id;
}

var Society = cc.Class({
    extends: cc.Component,

    properties: {
        // Unlearnt Wishes
        wishes: {
            default: [],
            type: [Wish],
        },

        // Root node to host all people
        host: {
            default: null,
            type: cc.Node
        },

        battlePanel: {
            default: null,
            type: BattlePanel
        },

        fxRitual: {
            default: null,
            type: FXRitual,
        },

        // Decide when to ask
        prayDelay: 3,
        
        // Decide the possibility to lost people
        lostCoef: 1,

        // Decide when to learn, +- 1 floating
        learnDelay: 1,

        // Population
        population: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.rituals = {};
        this.ritualCount = 0;
        
        this.god = this.getComponent('God');
        
        // People who do nothing
        this.defaultGroup = new Group(this);
        // People who is learning the learningSkill
        this.learningGroup = new Group(this);
        // All running groups which is not in default state
        this.runningGroups = [];

        this.timeout = this.prayDelay;
    },

    wishCheck: function (group, wishID) {
        if (group.isLearning() && group.wish && group.wish.id === wishID) {
            var i, people = group.people, 
                poses = {}, person, pose, max = 1, pickedPose;
            for (i = 0; i < people.length; ++i) {
                person = people[i];
                pose = person.getComponent('HumanBehavior').currentPose;
                if (poses[pose]) {
                    poses[pose] ++;
                    if (poses[pose] > max) {
                        max = poses[pose];
                        pickedPose = pose;
                    }
                }
                else {
                    poses[pose] = 1;
                }
            }
            // Ritual need satisfied
            var wish = group.wish;
            if (pickedPose && max >= wish.ritualNeed) {
                this.tribute(max * wish.wishConsume);
                this.scheduleOnce(function () {
                    this.vitualLearnt(wish, pickedPose);
                }, 3);
                group.toState(States.WORSHINPING, pickedPose);
            }
        }
        else if (group.isPraying() && group.prayRitual === this.rituals[wishID]) {
            this.tribute(group.people.length * Wishes[wishID].wishConsume);
            group.toState(States.WORSHINPING);
        }
        else if (group.wish) {
            // Force update pose
            group.punish();
        }
    },

    skillFired: function (wishID) {
        if (!this.learningGroup.isLearning()) {
            return;
        }

        this.wishCheck(this.learningGroup, wish);

        for (var i = 0; i < this.runningGroups.length; ++i) {
            var group = this.runningGroups[i];
            this.wishCheck(group);
        }
    },

    tribute: function (resources) {
        this.god.tribute(resources);
    },

    newSkillsAvailable: function (skills) {
        for (var i = 0; i < skills.length; ++i) {
            var name = skills[i];
            if (Wishes[name]) {
                this.wishes.push(Wishes[name]);
            }
        }
    },

    startLearning: function () {
        if (this.learningGroup.isLearning()) {
            this.learningGroup.toState(States.LEARNING);
        }
    },

    learn: function () {
        for (var i = 0; i < this.wishes.length; ++i) {
            var wish = this.wishes[i];
            this.learningGroup.reuse(this);
            var delay = this.learnDelay - 1 + Math.random() * 2;
            var succeed = this.defaultGroup.split(wish, this.learningGroup);
            if (succeed) {
                this.learningGroup.wish = wish;
                this.learningGroup.learning = true;
                this.scheduleOnce(this.startLearning, delay);
                break;
            }
        }
    },

    vitualLearnt: function (wish, pose) {
        this.rituals[wish.id] = pose;
        this.ritualCount = Object.keys(this.rituals).length;
        this.timeout = this.prayDelay;
        var index = this.wishes.indexOf(wish);
        if (index !== -1) {
            this.wishes.splice(index, 1);
        }
        index = UnusedPoses.indexOf(pose);
        if (index > -1) {
            UnusedPoses.splice(index, 1);
        }
        this.fxRitual.playAnim();
    },

    rejointDefault: function (group) {
        var defaultGroup = this.defaultGroup;
        group.people.forEach((person) => {
            defaultGroup.addMember(person);
        });
        if (group === this.learningGroup) {
            group.unuse();
        }
        else {
            var index = this.runningGroups.indexOf(group);
            if (index >= 0) {
                this.runningGroups.splice(index, 1);
            }
            cc.pool.putInPool(group);
        }
    },

    lost: function (count) {
        this.population -= count;
        this.battlePanel.people.string = this.population;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // Learn new skill if possible
        if (this.wishes.length > 0 && !this.learningGroup.learning) {
            this.learn();
        }
        if (this.learningGroup.active) {
            this.learningGroup.update(dt);
        }
        // Pray with ritual
        var group;
        if (this.ritualCount > 0) {
            // Ready for praying
            if (this.timeout <= 0) {
                this.timeout = this.prayDelay;
                var knownWishes = Object.keys(this.rituals);
                var wishID = knownWishes[Math.floor(Math.random() * knownWishes.length)];
                var wish = Wishes[wishID];
                group = cc.pool.hasObject(Group) ? cc.pool.getFromPool(Group) : new Group(this);
                var succeed = this.defaultGroup.split(wish, group);
                if (succeed) {
                    group.wish = wish;
                    group.praying = true;
                    this.runningGroups.push(group);
                    group.toState(States.PRAYING);
                }
            }
            this.timeout -= dt;
        }

        for (var i = 0; i < this.runningGroups.length; ++i) {
            group = this.runningGroups[i];
            if (group.active) {
                group.update(dt);
            }
        }
    },
});

Society.Wishes = Wishes;

