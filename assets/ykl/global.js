
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
    Learning: 0,
    Doubting: 1,
    Confirming: 2,
    ThanksGiving: 3,
    Nothing: 4,
    Asking: 5,
    Lost: 6
});

var Poses = [
    'dark_knight_fall',
    'dark_knight_idle'
];

window.Wishes = Wishes;
window.States = States;
window.Poses = Poses;
