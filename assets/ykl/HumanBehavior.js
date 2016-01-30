

cc.Class({
    extends: cc.Component,

    properties: {
        anim: {
            default: null,
            type: cc.Animation
        },

        currentPose: {
            visible: false,
            default: '',
            displayName: '当前姿势',
            notify: function () {
                if (CC_EDITOR) return;

                // 播动画
                this.anim.stop();
                this.anim.play(this.currentPose);

                // 做其他事情
            }
        },

        currentWish: {
            visible: false,
            default: '',
            displayName: '当前愿望',
            notify: function () {
                if (CC_EDITOR) return;

                var name = WishType[this.currentWish.id];
                this.wishIconLabel.string = name;
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
        },

        moveSpeed: 300
    },

    onLoad: function () {
        this.checked = false;
        this._time = 0;
        this.canvas = cc.find('Canvas');
    },

    _updateState: function (oldState) {
        var state = this.currentState;

        if ( state === window.States.DEFAULT ) {
            // 无序行走
            this.wishIcon.x = this.wishIcon.y = 0;
            this.wishIcon.active = false;
        }
        else if ( state === window.States.LEARNING ) {
            if (oldState !== window.States.DOUBTING) {
                this.showWish();
            }
            this.wishIcon.getComponent(cc.Button).interactable = true;
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
        this.wishIcon.getComponent(cc.Button).interactable = false;
        this.wishIconLabel.string = 'checked';

        this.canvas.emit('wish-clicked', this);
    },

    showWish: function () {
        this.wishIcon.stopAllActions();
        this.wishIcon.active = true;
        this.wishIcon.runAction( cc.moveBy(0.2, 0, 220) );
    }
});
