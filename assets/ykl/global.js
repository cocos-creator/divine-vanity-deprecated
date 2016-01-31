
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
    Rain: -1,
	Fire: -1,
	Meat: -1,
    Sun: -1,
    Wheet: -1
});

var Poses = [
    'p_act01',
    'p_act02',
    'p_act03',
    'p_act04',
    'p_act05',
    'p_act06',
    'p_act07',
    'p_act08'
];

var UnusedPoses = [
    'p_act01',
    'p_act02',
    'p_act03',
    'p_act04',
    'p_act05',
    'p_act06',
    'p_act07',
    'p_act08'
];

window.States = States;
window.Poses = Poses;
window.UnusedPoses = UnusedPoses;
window.WishType = WishType;
