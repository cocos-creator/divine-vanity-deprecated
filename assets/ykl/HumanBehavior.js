var firstRight = false;
var firstWrong = false;

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
                //if (CC_EDITOR) return;

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
                //if (CC_EDITOR) return;

                var name = WishType[this.currentWish.id];
                this.wishIcon.getComponent(cc.Sprite).spriteFrame = this.sfWishIcons[this.currentWish.id];
                this.wishIconAnim.play('show');
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

        wishIconAnim: {
            default: null,
            type: cc.Animation
        },

        sfWishIcons: [cc.SpriteFrame],

        pray: cc.Animation,

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
        if (oldState === window.States.PRAYING) {
            this.pray.getComponent(cc.Sprite).enabled = false;
        }

        if ( state === window.States.DEFAULT ) {
            this.hideWish();
            this.anim.play('idle');
            this.checked = false;
        }
        else if ( state === window.States.LEARNING ) {
            this.wishIcon.getChildByName('skill_confirm').opacity = 0;
            if (oldState !== window.States.DOUBTING) {
                this.showWish();
            }
            this.wishIcon.getComponent(cc.Button).interactable = true;
        }
        else if ( state === window.States.DOUBTING ) {
            if (firstWrong === false) {
                firstWrong = true;
                cc.find('Canvas/world/narrative').getComponent('Narrative').playLine(4);
            }
            // 头上显示问号
            this.wishIconAnim.play('doubt');
        }
        else if ( state === window.States.CONFIRMING ) {
            this.hideWish();
            // 头上有问号
            // this.anim.play('confirming');
        }
        else if ( state === window.States.WORSHIPING ) {
            // 头上无问号，播放跪拜动画
            this.hideWish();
            var tribute = this.node.getChildByName('tribute');
            var str = '+' + this.tribute;
            tribute.active = true;
            tribute.getComponent(cc.Label).string = str;
            tribute.runAction(cc.sequence(
                cc.moveTo(1, 0, 120),
                cc.callFunc(function () {
                    tribute.y = 80;
                    tribute.active = false;
                })
            ).easing(cc.easeOut(2)));
            // this.anim.play('p_act03');
        }
        else if ( state === window.States.LOST ) {
            // 丢失或是死掉
            this.anim.play('die');
            this.node.runAction(cc.sequence(cc.fadeOut(2.5), cc.callFunc(function () {
                this.node.removeFromParent();
            }, this)));
        }
    },

    onChecked: function () {
        if (this.currentState !== window.States.LEARNING) {
            return;
        }
        if (firstRight === false) {
            firstRight = true;
            let nar = cc.find('Canvas/world/narrative').getComponent('Narrative');
            this.scheduleOnce(function() {
                nar.playLine(3);
            }, 1);
        }
        this.checked = true;
        this.wishIcon.getComponent(cc.Button).interactable = false;
        this.wishIconAnim.play('confirm');

        this.canvas.emit('wish-clicked', this);
    },

    showWish: function () {
        this.wishIcon.stopAllActions();
        this.wishIcon.active = true;
        this.wishIcon.runAction( cc.moveTo(0.2, 0, 120) );
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
        }

        var speed = this.idleMoveSpeed * dt;
        var x = this.node.x + speed;
        var width = this.canvas.width;

        if (x <= 0 || x >= width) {
            this.idleMoveSpeed *= -1;
            x = this.node.x - speed;
        }

        if (this.idleMoveSpeed < 0 && this.anim.currentClip.name !== 'idle-left') {
            this.anim.play('idle-left');
        }
        else if (this.idleMoveSpeed > 0 && this.anim.currentClip.name !== 'idle') {
            this.anim.play('idle');
        }

        this.node.x = x;
    }
});
