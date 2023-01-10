
const Followers = require('../models').Followers;
const User = require('../models').User;

async function getUserIdByEmail(email) {
    const user =  await User.findOne({ where: { email }})
    return user?.id || undefined
}

async function follow(userId, userToFollowId) {
    console.log(`\t ${userId}  -->  ${userToFollowId}`);
    if (userId !== userToFollowId) {
        try {
            await Followers.create({ user_id: userId, follower_id: userToFollowId})
            console.log(`\t\tDone!`);
        } catch (error) {
            console.log(`\t\tAlready following this user!`);
        }
    }
}

async function run() {
    console.log(`====================== START =====================`);
    await follow('939a2420-7123-11ed-a0c7-79aae79f40c7', '081d9070-7124-11ed-a0c7-79aae79f40c7')
    await follow('939a2420-7123-11ed-a0c7-79aae79f40c7', '081d9070-7124-11ed-a0c7-79aae79f40c7')
    console.log(await getUserIdByEmail('ms@test.com'));
    console.log(`======================  END  =====================`);
}

run()