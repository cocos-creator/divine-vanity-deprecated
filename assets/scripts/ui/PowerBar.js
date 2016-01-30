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
        this.curValue = this.power.progress * 100;
        this.curProgressValue = 0;
    },

    updateValue: function (value, barValue, addorLower) {
        this.changePower = true;
        this.newPowerValue = value;
        this.newPowerBarValue = barValue;
        this.curProgressValue = parseFloat(this.power.progress.toFixed(2));
        this.addPower = this.newPowerBarValue >= this.curProgressValue ? 1 : -1;
    },

    animaBar: function () {
        if (this.changePower) {
            this.curProgressValue = parseFloat(this.power.progress.toFixed(2));
            if (this.curProgressValue !== this.newPowerBarValue) {
                this.power.progress += 0.01 * this.addPower;
            }
            if (this.curValue !== this.newPowerValue) {
                this.curValue += 1 * this.addPower;
                this.content.string = this.curValue;
            }
            if (this.curProgressValue == this.newPowerBarValue && this.curValue === this.newPowerValue) {
                this.changePower = false;
            }
        }
    },

    update: function (dt) {
        this.animaBar();
    }
});
