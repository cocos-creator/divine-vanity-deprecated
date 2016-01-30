cc.Class({
    extends: cc.Component,
    editor: {
        executeInEditMode: true,
        requireComponent: require('Camera')
    },
    properties: {
        target: {
            default: null,
            type: cc.Node,
            tooltip: 'The target object to look at'
        },
        offset: {
            default: cc.Vec2.ZERO,
        },
        speed: {
            default: 100,
            tooltip: 'The max moving speed in world units per second'
        }
        //padding: {
        //    default: 20,
        //    tooltip: 'The distance in pixels between target object and the edge of screen'
        //}
    },

    onLoad () {
        this.camera = this.getComponent('Camera');
    },

    _getWorldPosition (node) {
        var world = node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var scene = cc.director.getRunningScene();
        if ( scene ) {
            return scene.convertToNodeSpaceAR(world);
        }
        else {
            return world;
        }
    },

    _setWorldPosition (node, pos) {
        var scene = cc.director.getRunningScene();
        if (scene) {
            pos = cc.v2(scene.convertToWorldSpaceAR(pos));
        }
        if (node.parent) {
            node.position = node.parent.convertToNodeSpaceAR(pos);
        }
        else {
            node.position = pos;
        }
    },

    lateUpdate: function (dt) {
        if (!this.target) {
            return;
        }
        if (!this.camera) {
            return;
        }

        var src = this._getWorldPosition(this.node);
        // get world position which not transformed by camera
        var dest = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        dest = this.camera.world.convertToNodeSpace(dest);
        //
        dest.addSelf(this.offset);

        var delta = dest.sub(src);
        var magSqr = delta.magSqr();
        var maxDelta = (this.speed * dt);

        var pos;
        if (magSqr <= maxDelta * maxDelta) {
            pos = dest;
        }
        else {
            // tween
            var dir = delta.divSelf(Math.sqrt(magSqr));
            pos = src.addSelf(dir.mulSelf(maxDelta));
        }

        this._setWorldPosition(this.node, pos);
    },
});
