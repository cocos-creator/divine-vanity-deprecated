
var Wishes = [
    // Fire
    {
        name: 'Fire',
        rndPoseNum: 2,
        poseContinueTime: 3,
        gatherSpeed: 1
    }
];

var States = cc.Enum({
    DEFAULT: 0,
    LEARNING: 1,
    DOUBTING: 2,
    CONFIRMING: 3,
    WORSHIPING: 4,
    ASKING: 5,
    LOST: 6
});

var Poses = [
    'dark_knight_fall',
    'dark_knight_idle'
];

window.Wishes = Wishes;
window.States = States;
window.Poses = Poses;
