
var States = cc.Enum({
    DEFAULT: 0,
    LEARNING: 1,
    DOUBTING: 2,
    CONFIRMING: 3,
    WORSHIPING: 4,
    ASKING: 5,
    LOST: 6
});

var WishType = cc.Enum({
	Fire: -1,
	Water: -1,
	Meat: -1,
});

var Poses = [
    'p_act01',
    'p_act02',
    'p_act03'
];

window.States = States;
window.Poses = Poses;
window.UnusedPoses = Poses;
window.WithType = WishType;
