

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

        moveSpeed: 300,

        idleMoveSpeed: 50,

        idleChangeDirectionTimeRange: cc.v2(2, 4)
    },

    onLoad: function () {
        this.checked = false;
        this.canvas = cc.find('Canvas');

        this._idleTime = this._idleChangeDirectionTime = 3;

        this._updateState();
    },

    _updateState: function (oldState) {
        var state = this.currentState;

        if ( state === window.States.DEFAULT ) {
            this.hideWish();
            this.anim.play('idle');
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
            this.hideWish();
            // 头上有问号
            // this.anim.play('confirming');
        }
        else if ( state === window.States.WORSHIPING ) {
            // 头上无问号，播放跪拜动画
            // this.anim.play('worshiping');
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
        this.wishIcon.runAction( cc.moveBy(0.2, 0, 120) );
    },

    hideWish: function () {
        this.wishIcon.x = this.wishIcon.y = 0;
        this.wishIcon.active = false;
    },

    update: function (dt) {
        if (this.currentState === window.States.DEFAULT) {
            this.handleDefaultState(dt);
        }
    },

    handleDefaultState: function (dt) {
        this._idleTime += dt;
        if (this._idleTime > this._idleChangeDirectionTime) {
            this._idleTime = 0;

            var range = this.idleChangeDirectionTimeRange;
            this._idleChangeDirectionTime = range.x + Math.random() * (range.y - range.x);

            var direction = Math.floor( Math.random() * 2 );
            this.idleMoveSpeed *= direction === 0 ? -1 : 1;
            this.changeIdleAnimByDirection(this.idleMoveSpeed);
        }

        var speed = this.idleMoveSpeed * dt;
        var x = this.node.x + speed;
        var width = this.canvas.width;

        if (x <= 0 || x >= width) {
            this.idleMoveSpeed *= -1;
            this.changeIdleAnimByDirection(this.idleMoveSpeed);

            x = this.node.x - speed;
        }

        this.node.x = x;
    },

    changeIdleAnimByDirection: function (direction) {
        if (direction <= 0) {
            this.anim.play('idle-left');
        }
        else {
            this.anim.play('idle');
        }
    }
});
