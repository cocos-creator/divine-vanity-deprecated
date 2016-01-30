var PowerBar = cc.Class ({
    extends: cc.Component,

    properties: {
        content: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function () {
        this.power = this.getComponent('cc.ProgressBar');
        this.changePower = false;
        this.newPowerValue = 0;
        this.newPowerBarValue = 0;
        this.addPower = 0;
        this.curValue = 0;
    },

    updateValue: function (value, barValue) {
        this.changePower = true;
        this.newPowerValue = value;
        this.newPowerBarValue = barValue;
        this.addPower = this.newPowerBarValue > this.power.progress ? 1 : -1;
    },

    animaBar: function () {
        if (this.changePower) {
            var progress = parseFloat(this.power.progress.toFixed(2));
            if (progress !== this.newPowerBarValue) {
                this.power.progress += 0.01 * this.addPower;
            }
            if (this.curValue !== this.newPowerValue) {
                this.curValue += this.addPower;
                this.content.string = this.curValue;
            }
            if (progress == this.newPowerBarValue && this.curValue === this.newPowerValue) {
                this.changePower = false;
            }
        }
    },

    update: function (dt) {
        this.animaBar();
    }
});
