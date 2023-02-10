const s = require('./ucd2023')
const grouped = {}
let counter = 0

const Followers = require('../models').Followers;
const User = require('../models').User;

async function getUserIdByEmail(email) {
    console.log(email);
    const user =  await User.findOne({ where: { email }})
    return user?.id || undefined
}

async function groupFollow(group) {
    console.log(`groupFollow: ${group}`);
    const g = grouped[group]
    
    for (let i = 0; i < g.length; i++) {
        const u1 = await getUserIdByEmail(g[i].Email)
        for (let j = 0; j < g.length; j++) {
            const u2 = await getUserIdByEmail(g[j].Email)
            await follow(u1, u2)
        }
    }

}

async function follow(userId, userToFollowId) {
    console.log(`\t ${userId}  -->  ${userToFollowId}`);
    if (userId !== userToFollowId) {
        try {
            await Followers.create({ user_id: userId, follower_id: userToFollowId})
            console.log(`\t\tDone!`);
            counter++
        } catch (error) {
            console.log(`\t\tAlready following this user!`);
        }
    }
}

function group() {
    for (const u of s) {
        if (!grouped[u.Section]) {
            grouped[u.Section] = []
        }

        grouped[u.Section].push(u)
    }
}

async function run() {
    console.log(`====================== START =====================`);
    group()

    for (const g of Object.keys(grouped)) {
        await groupFollow(g)
    }
    console.log(`Success Follow count: ${counter}`);
    console.log(`======================  END  =====================`);
}

run()