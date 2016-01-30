var HumanBehavior = require('HumanBehavior');

cc.Class({
    extends: cc.Component,

    properties: {
        humans: {
            default: [],
            type: HumanBehavior
        },

        showCheckedTimeMax: {
            default: 3,
            displayName: '显示button时长'
        }
    },

    onLoad: function () {
        this.currentState = '';
        // 已经被点击了的人类
        this.checkedHumans = [];

        this._showCheckedTime = this.showCheckedTimeMax;

        var canvas = cc.find('Canvas');
        canvas.on('wish-clicked', this.onHumanIconClicked, this);
    },

    break: function () {
        this.checkedHumans.forEach(function (item) {
            (function (item) {
                item.checked = false;
                item.currentState = window.States.DOUBTING;

                setTimeout(()=> {
                    item.currentState = window.States.LEARNING;
                }, 500);
            })(item);
        });

        this.checkedHumans = [];
    },

    update: function (dt) {
        this.updateHumanPosition();
        this.updateHumanIcon(dt);
    },

    updateHumanPosition: function () {

    },

    updateHumanIcon: function (dt) {
        this._showCheckedTime += dt;
        if (this._showCheckedTime < this.showCheckedTimeMax) {
            return;
        }

        this._showCheckedTime = 0;
    },

    addCheckedHuman: function (checkedHuman) {
        var checkedHumans = this.checkedHumans;

        if ( checkedHumans.indexOf(checkedHuman) !== -1 ) {
            return;
        }

        checkedHumans.push(checkedHuman);

        if ( checkedHumans.length > 1 &&
            (checkedHuman.currentWish !== checkedHumans[0].currentWish ||
            checkedHuman.currentPose !== checkedHumans[0].currentPose) ) {
            checkedHuman.checked = false;
            this.break();
            return;
        }

        if (checkedHumans.length < 2) {
            return;
        }

        // 重新规划目的地
        var destPosition = 0;
        var i = 0, l = checkedHumans.length;
        var human;

        for (; i < l; i++) {
            human = checkedHumans[i];
            destPosition += human.node.x;
        }

        destPosition /= l;

        var range = 100;
        for (i = 0; i < l; i++) {
            human = checkedHumans[i];

            var rndRange = range * (Math.random() - 0.5);
            var dest = rndRange + destPosition;
            if (dest < -480) {
                dest = -480;
            }
            human.moveTo(dest, human.node.y);
        }
    },

    onHumanIconClicked: function (event) {
        this.addCheckedHuman(event.detail);
    }
});
