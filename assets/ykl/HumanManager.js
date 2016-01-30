var HumanBehavior = require('HumanBehavior');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        // 已经被点击了的人类
        this.checkedHumans = [];

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
        this.updateHumanPosition(dt);
    },

    updateHumanPosition: function (dt) {
        var checkedHumans = this.checkedHumans;
        var length = checkedHumans.length;

        if (length < 2) {
            return;
        }

        var minDistance = 50;
        var speed = checkedHumans[0].moveSpeed * dt;

        for (var i = 0; i < length; i++) {
            var first = checkedHumans[i];
            var x = first.node.x;
            var close = false;
            var left = 0;
            var right = 0;
            var dif;

            for (var j = 0; j < length; j++) {
                var second = checkedHumans[j];
                if (second === first) {
                    continue;
                }

                dif = x - second.node.x;
                if ( Math.abs(dif) < minDistance ) {
                    close = true;
                    break;
                }

                if (dif > 0) {
                    left ++;
                }
                else {
                    right ++;
                }
            }

            if (close) {
                continue;
            }

            first.node.x += left > right ? -speed : speed;
        }
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
        }
    },

    onHumanIconClicked: function (event) {
        this.addCheckedHuman(event.detail);
    }
});
