
var MainPanel = require('MainPanel');

var Skills = {
    0: "雨|" + 5,
    1: "火|" + 10,
    2: "肉|" + 15,
    3: "健康|" + 20,
    4: "阳光|" + 25,
    5: "谷物|" + 30,
    6: "矿藏|" + 35,
    7: "武器|" + 40,
    8: "燃料|" + 45,
    9: "绿色植物|" + 50
};

var INIT_POWER = 100;
var MIN_POWER = 0;
var MAX_POWER = 100;

var Resources = cc.Class({
    extends: cc.Component,

    properties: {
        curPower: {
            default: 0,
            type: cc.Integer
        }
    },

    statics: {
        instance: null
    },

    onLoad: function () {
        Resources.instance = this;
    },

    start: function () {
        this.curPower = 0;
        this.addPower(INIT_POWER);
    },

    // 增加能量
    addPower: function (value) {
        this.curPower += value;
        this.curPower = this.curPower > MAX_POWER ? MAX_POWER : this.curPower;
        MainPanel.instance.power.updateValue(this.curPower, this.curPower / Resources.MAX_POWER);
    },

    // 减能量
    spendPower: function (value) {
        this.curPower -= value;
        this.curPower = this.curPower < MIN_POWER ? MIN_POWER : this.curPower;
        MainPanel.instance.power.updateValue(this.curPower, this.curPower / Resources.MAX_POWER);
    }
});

Resources.MIN_POWER = MIN_POWER;
Resources.MAX_POWER = MAX_POWER;
Resources.Skills = Skills;
