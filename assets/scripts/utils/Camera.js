cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: true,
    },

    properties: {
        preview: {
            get () {
                return this.enabled;
            },
            set (value) {
                this.enabled = value;
            },
            tooltip: 'Enable to preview in editor'
        },

        world: {
            default: null,
            type: cc.Node,
            tooltip: 'The root object which contains all the object rendering in camera.'
        },

        // ...
    },

    //onEnable () {
    //    if (this.world) {
    //        if ( !this.world.position.equals(cc.Vec2.ZERO) ) {
    //            cc.error('The position of your camera\'s world node should be (0, 0)');
    //        }
    //        if ( this.world.rotation !== 0 ) {
    //            cc.error('The rotation of your camera\'s world node should be 0');
    //        }
    //        if ( this.world.scaleX !== 1 || this.world.scaleY !== 1) {
    //            cc.error('The scale of your camera\'s world node should be 1');
    //        }
    //    }
    //},

    onDisable () {
        // revert world's transform so that the editor's scene view can be reset
        this.world.position = cc.Vec2.ZERO;
        this.world.scale = cc.Vec2.ONE;
        this.world.rotation = 0;

        cc.log('onDisable');

        if (CC_EDITOR && !cc.engine.isPlaying) {
            cc.engine.repaintInEditMode();
        }
    },

    lateUpdate (dt) {
        var node = this.node;
        var world = this.world;
        if ( !world ) {
            return;
        }
        var screenCenter;
        if (cc.Canvas.instance) {
            screenCenter = cc.Canvas.instance.node.position;
        }

        // compute position
        var position = screenCenter.sub(node.position);

        // compute scale
        var scale = node.scaleX;
        var offset = position.subSelf(screenCenter);
        offset.mulSelf(scale);
        position = screenCenter.add(offset);

        // compute rotation
        var rotation = -node.rotation;
        if (rotation !== 0) {
            position = screenCenter.add(offset.rotate(-rotation * cc.RAD));
        }

        world.position = position;
        world.rotation = rotation;
        world.scale = scale;
    },
});
