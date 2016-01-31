var Wish = cc.Class({
    name: 'Wish',
    properties: {
        id: 0,
        poseCount: 2,
        poseDuration: 3,
        moveSpeed: 50,
        ritualNeed: 3,
        tributePerP: 2,
        divineConsume: 1,
        wishConsume: 3,
        levelBonus: 0.1,
        attraction: 1,
    }
});

module.exports = Wish;