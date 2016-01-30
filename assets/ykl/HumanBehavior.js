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

cc.Class({
    extends: cc.Component,

    properties: {
        currentPose: {
            visible: false,
            default: '',
            displayName: '当前姿势',
            notify: function () {
                if (CC_EDITOR) return;

                // 播动画
                var anim = this.getComponent(cc.Animation);
                anim.play(this.currentPose);

                // 做其他事情
            }
        },

        currentWish: {
            visible: false,
            default: '',
            displayName: '当前愿望',
            notify: function () {
                if (CC_EDITOR) return;

                this._poseContinueTime = this.currentWish.poseContinueTime;

                setTimeout(() => {
                    this.showWish();
                }, 1000);
            }
        },

        currentState: {
            visible: false,
            default: window.States.Learning,
            notify: function () {
                this._updateState();
            }
        },

        wishIcon: {
            default: null,
            type: cc.Node
        },

        wishIconLabel: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function () {
        this.checked = false;
        this._time = 0;
        this.canvas = cc.find('Canvas');

        this.currentState = window.States.Learning;
    },

    update: function (dt) {
        this.updateTime(dt);
    },

    updateTime: function (dt) {
        this._time += dt;

        if ( this._time < this._poseContinueTime ) {
            return;
        }

        this._time = 0;

        if ( !this.checked ) {
            this.randomPose();
        }
    },

    _updateState: function () {
        var state = this.currentState;

        if ( state === window.States.Learning ) {
            this.randomWish();
            this.randomPose();
        }
        else if ( state === window.States.Doubting ) {
            // 头上显示问号
            this.wishIconLabel.string = 'Doubting';
        }
        else if ( state === window.States.Confirming ) {
            // 头上有问号
        }
        else if ( state === window.States.ThanksGiving ) {
            // 头上无问号，播放跪拜动画
            // var anim = this.getComponent(cc.Animation);
            // anim.play('跪拜');
        }
        else if ( state === window.States.Nothing ) {
            // 无序行走

        }
        else if ( state === window.States.Lost ) {
            // 丢失或是死掉
        }
    },

    randomPose: function () {
        var poses = randomArrayItems(window.Poses, this.currentWish.rndPoseNum);
        var rndNum = Math.random();
        var index = Math.floor( rndNum * poses.length );
        var pose = poses[index];

        if (pose !== this.currentPose) {
            this.currentPose = pose;
        }
    },

    randomWish: function () {
        var wishes = window.Wishes;
        var rndNum = Math.random();
        var index = Math.floor( rndNum * wishes.length );
        var wish = wishes[index];

        if (wish !== this.currentWish) {
            this.currentWish = wish;
        }

        this.wishIconLabel.string = this.currentWish.name;
    },

    onChecked: function () {
        if (this.currentState !== window.States.Learning) {
            return;
        }
        this.checked = true;
        this.wishIconLabel.string = 'checked';

        this.canvas.emit('wish-clicked', this);
    },

    moveTo: function (x, y) {
        this.node.runAction( cc.moveTo(this.currentWish.gatherSpeed, x, y) );
    },

    showWish: function () {
        this.wishIcon.stopAllActions();
        this.wishIcon.active = true;
        this.wishIcon.runAction( cc.moveBy(0.2, 0, 70) );
    }
});
