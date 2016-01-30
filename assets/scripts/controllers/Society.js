cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        
        // Decide when to ask
        askCoef: 0,
        
        // Decide the possibility to lost people
        lostCoef: 1
    },

    // use this for initialization
    onLoad: function () {
        this.people = [];
        this.rituals = {};
        
        this.god = this.getComponent('God');
        
        // The current learning skill, unlike asking, only one skill can be learning at one time
        this.learningSkill = null;
        // People who is learning the learningSkill
        this.learning = {
            trying: [],
            confirmed: [],
            doubt: []
        };
        // People who do nothing
        this.doNothing = [];
        // People who is asking, divided into group by skills they ask for
        this.asking = {};
        // People who are thanks god's giving
        this.thanksGiving = [];
        // People who are lost
        this.lost = [];
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
