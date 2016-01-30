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
        this.addPowerText = 0;
        this._curValue = 0;
    },

    updateValue: function (value, barValue) {
        this.changePower = true;
        this.newPowerValue = value;
        this.newPowerBarValue = barValue;
        this.addPower = this.newPowerBarValue > this.power.progress ? 0.01 : -0.01;
        this.addPowerText = this.newPowerBarValue > this.power.progress ? 1 : -1;
    },

    animatPBar: function () {
        if (this.changePower) {
            var progress = parseFloat(this.power.progress.toFixed(2));
            if (progress !== this.newPowerBarValue) {
                this.power.progress += this.addPower;
            }
            if (this._curValue !== this.newPowerValue) {
                this._curValue += this.addPowerText ;
                this.content.string = this._curValue;
            }
            if (progress == this.newPowerBarValue && this._curValue === this.newPowerValue) {
                this.changePower = false;
            }
        }
    },

    update: function (dt) {
        this.animatPBar();
    }
});
