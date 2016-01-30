cc.Class ({
    extends: cc.Component,

    properties: {
        maxPower: 100,
        power: {
            default: null,
            type: cc.ProgressBar
        },
        powerLabel: {
            default: null,
            type: cc.Label
        }

    },

    // use this for initialization
    onLoad: function () {
        this.init();
    },

    init: function () {
        this.powerValue = 0;
        this.updatePower(50);
    },

    updatePower: function (value) {
        this.changePower = true;
        this.newPowerValue = value;
        this.newPowerBarValue = value / this.maxPower;
        this.addPower = this.newPowerBarValue > this.power.progress ? 0.01 : -0.01;
    },

    // called every frame
    update: function (dt) {
        if (this.changePower) {
            if (this.power.progress.toFixed(2) !== this.newPowerBarValue) {
                this.power.progress += this.addPower;
            }
            if (this.powerValue !== this.newPowerValue) {
                this.powerValue++;
                this.powerLabel.string = this.powerValue;
            }
            if (this.power.progress.toFixed(2) == this.newPowerBarValue &&
                this.powerValue === this.newPowerValue) {
                this.changePower = false;
            }
        }
    }
});
