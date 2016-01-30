require('../../ykl/global');
var Group = require('Group');

var Rituals = {
    'rain': {
        name: 'rain',
        difficulty: 3,
        needs: 2
    }
};

cc.Class({
    extends: cc.Component,

    properties: {
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
        this.rituals = {};
        this.unknownRituals = {};
        
        this.god = this.getComponent('God');
        
        // People who do nothing
        this.defaultGroup = new Group();
        // The current learning skill, unlike asking, only one skill can be learning at one time
        this.learningRitual = null;
        // People who is learning the learningSkill
        this.learningGroup = new Group();
        // All running groups which is not in default state
        this.runningGroups = [];

        this.generate(3);
    },

    skillFired: function (skill) {
        if (this.learningGroup.isLearning()) {
            // this.learningGroup.
        }
    },

    tribute: function (resources) {

    },

    newSkillsAvailable: function (skills) {
        for (var i = 0; i < skills.length; ++i) {
            var name = skills[i];
            if (Rituals[name]) {
                this.unknownRituals.push(Rituals[name]);
            }
        }
    },

    startLearning: function () {
        if (this.learningGroup.isLearning()) {
            this.learningGroup.toState(States.LEARNING);
        }
    },

    learn: function () {
        for (var i = 0; i < this.unknownRituals.length; ++i) {
            var ritual = this.unknownRituals[i];
            this.learningGroup.reuse();
            var delay = this.learnDelay - 1 + Math.random() * 2;
            var succeed = this.defaultGroup.learn(ritual, this.learningGroup);
            if (succeed) {
                this.learningGroup.learnRitual = ritual;
                this.scheduleOnce(this.startLearning, delay);
                break;
            }
        }
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
        if (this.unknownRituals.length > 0 && !this.learningGroup.isLearning()) {
            this.learn();
        }
        for (var i = 0; i < this.runningGroups.length; ++i) {
            var group = this.runningGroups[i];
            // switch (group.)
        }
    },
});
