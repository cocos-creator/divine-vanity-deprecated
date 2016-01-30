

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
            }
        },

        currentState: {
            visible: false,
            default: window.States.DEFAULT,
            notify: function (oldState) {
                this._updateState(oldState);
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

        this.currentState = window.States.LEARNING;
    },

    _updateState: function (oldState) {
        var state = this.currentState;

        if ( state === window.States.DEFAULT ) {
            // 无序行走
        }
        else if ( state === window.States.LEARNING ) {
            if (oldState !== window.States.DOUBTING) {
                // setTimeout(() => {
                    this.showWish();
                // }, 1000);
            }
        }
        else if ( state === window.States.DOUBTING ) {
            // 头上显示问号
            this.wishIconLabel.string = 'Doubting';
        }
        else if ( state === window.States.CONFIRMING ) {
            // 头上有问号
        }
        else if ( state === window.States.WORSHIPING ) {
            // 头上无问号，播放跪拜动画
            // var anim = this.getComponent(cc.Animation);
            // anim.play('跪拜');
        }
        else if ( state === window.States.LOST ) {
            // 丢失或是死掉
        }
    },

    onChecked: function () {
        if (this.currentState !== window.States.LEARNING) {
            return;
        }
        this.checked = true;
        this.wishIconLabel.string = 'checked';

        this.canvas.emit('wish-clicked', this);
    },

    showWish: function () {
        this.wishIcon.stopAllActions();
        this.wishIcon.active = true;
        this.wishIcon.runAction( cc.moveBy(0.2, 0, 70) );
    }
});
