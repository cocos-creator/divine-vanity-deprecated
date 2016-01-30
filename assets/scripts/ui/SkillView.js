

var Skills = {
    0: "雨",
    1: "火",
    2: "肉",
    3: "健康",
    4: "阳光",
    5: "谷物",
    6: "矿藏",
    7: "武器",
    8: "燃料",
    9: "绿色植物"
};

cc.Class({
    extends: cc.Component,

    properties: {
        skillTemplate: {
            default: null,
            type: cc.Prefab
        },
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        spawnCount: 0,
        spacing: 0
    },

    // use this for initialization
    onLoad: function () {
    	this.content = this.scrollView.content;
        this.skills = [];
    	this.initialize();
    },
    
    useSkill: function (skillID) {
        alert("use skill:" + skillID + " : " + Skills[skillID]);
        this.node.emit("skill-fired", { "skillID": skillID });
    },

    initialize: function () {
        for (let i = 0; i < this.spawnCount; ++i) {
            let item = cc.instantiate(this.skillTemplate);
            if (i === 0) {
                this.content.height = this.spawnCount * (item.height + this.spacing) + this.spacing;
            }
    		this.content.addChild(item);
            item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            item.getComponent('Skill').updateSkill(i, Skills[i], this.useSkill);
            this.skills.push(item);
    	}
    },
    
    update: function(dt) {
        
    }
});