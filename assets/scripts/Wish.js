var Wish = cc.Class({
    name: 'Wish',
    properties: {
        name: '',
        poseCount: 1,
        poseDuration: 3,
        moveSpeed: 50,
        ritualNeed: 3,
        tributePerP: 2,
        divineConsume: 1,
        wishConsume: 3,
        levelBonus: 0.1
    }
});

module.exports = Wish;