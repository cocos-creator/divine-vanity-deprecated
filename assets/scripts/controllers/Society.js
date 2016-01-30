require('../../ykl/global');
var Group = require('Group');
var Wish = require('../Wish');

window.Wishes = {};

cc.Class({
    extends: cc.Component,

    properties: {
        // Wishes
        wishes: {
            default: [],
            type: [Wish],
        },

        // Person prefab for generating people
        person: {
            default: null,
            type: cc.Prefab
        },

        // Root node to host all people
        host: {
            default: null,
            type: cc.Node
        },

        // Decide when to ask
        askCoef: 0,
        
        // Decide the possibility to lost people
        lostCoef: 1,

        // Decide when to learn, +- 1 floating
        learnDelay: 3,
    },

    // use this for initialization
    onLoad: function () {
        for (var i = 0; i < this.wishes.length; ++i) {
            var wish = this.wishes[i];
            if (wish.name) {
                Wishes[wish.name] = wish;
            }
        }

        this.rituals = {};
        this.unknownWishes = {};
        
        this.god = this.getComponent('God');
        
        // People who do nothing
        this.defaultGroup = new Group();
        // People who is learning the learningSkill
        this.learningGroup = new Group();
        // All running groups which is not in default state
        this.runningGroups = [];

        this.generate(3);
    },

    skillFired: function (skill) {
        if (this.learningGroup.isLearning()) {
            for (var i = 0; i < this.learningGroup.length; ++i) {
                var person = this.learningGroup[i];
            }
        }
    },

    tribute: function (resources) {

    },

    newSkillsAvailable: function (skills) {
        for (var i = 0; i < skills.length; ++i) {
            var name = skills[i];
            if (Wishes[name]) {
                this.unknownWishes.push(Wishes[name]);
            }
        }
    },

    startLearning: function () {
        if (this.learningGroup.isLearning()) {
            this.learningGroup.toState(States.LEARNING);
        }
    },

    learn: function () {
        for (var i = 0; i < this.unknownWishes.length; ++i) {
            var wish = this.unknownWishes[i];
            this.learningGroup.reuse();
            var delay = this.learnDelay - 1 + Math.random() * 2;
            var succeed = this.defaultGroup.learn(wish, this.learningGroup);
            if (succeed) {
                this.learningGroup.wish = wish;
                this.scheduleOnce(this.startLearning, delay);
                break;
            }
        }
    },

    learnt: function (wish, ritual) {
        this.rituals[wish.name] = ritual;
    },

    generate: function (count) {
        if (!this.host) {
            return;
        }
        for (var i = 0; i < count; ++i) {
            var newbie = cc.instantiate(this.person);
            // Random between [50, width-100)
            newbie.x = 100 + Math.floor( Math.random() * (cc.visibleRect.width-200) );
            newbie.y = 180;
            this.host.addChild(newbie);
            this.defaultGroup.addMember(newbie);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // Learn new skill if possible
        if (this.unknownWishes.length > 0 && !this.learningGroup.isLearning()) {
            this.learn();
        }
        for (var i = 0; i < this.runningGroups.length; ++i) {
            var group = this.runningGroups[i];
            // switch (group.)
        }
    },
});
