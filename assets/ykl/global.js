
var States = cc.Enum({
    DEFAULT: 0,
    LEARNING: 1,
    DOUBTING: 2,
    CONFIRMING: 3,
    WORSHIPING: 4,
    PRAYING: 5,
    LOST: 6
});

var WishType = cc.Enum({
	Fire: -1,
	Rain: -1,
	Meat: -1,
});

var Poses = [
    'p_act01',
    'p_act02',
    'p_act03',
    'p_act04',
    'p_act05'
];

window.States = States;
window.Poses = Poses;
window.UnusedPoses = Poses;
window.WishType = WishType;
