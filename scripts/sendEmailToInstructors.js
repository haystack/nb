const EmailUtil = require('../utils/emailUtil')
const Sequelize = require('../models').sequelize;


const EMAIL_TYPE = 'TIPSANDTRICKS'
const SUBJECT = 'NB Announcement 📢'

function buildEmail(userId, emailType) {
    const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NB</title>
    </head>
    <body  style=" padding: 30px 15px; color: #4a2270; font-family: sans-serif; max-width: 600px;">
        <table style="width: 100%;">
            <tr>
                <td style="text-align: center; height: 70px; background: #4a2270; align-items: center; margin: 0 0 20px 0;">
                    <a href="https://nb.mit.edu/" target="_blank">
                        <img  style="height: 70px" src="https://nb.mit.edu/res/nb-logo.png"/>
                    </a>
                </td>
            </tr>
            <tr style="margin-top: 25px;">
                <td style="border-top: 1px solid #000000; padding: 10px;">
                    <h1>👋 Hello NB instructors</h1>
                    <p style="color: #000000;">
                        With the fall approaching, we wanted to inform you of some of the new features we've recently added to NB.   Before doing that, I want to remind you that we have an <a href="https://groups.google.com/g/nbusers">NB discussion group</a> that we monitor and that you can join to ask questions, get help using features, request new features, or discuss teaching strategies with other faculty.   But on to the feature list:
                        <ul>
                            <li>Instructors can spotlight high-value annotations.   These annotations are shown expanded in the document itself to draw students attention to them.   You can control the style of spotlighting, showing it in a box in the margin or, for HTML documents, inline in the document itself</li>
                            <li>annotation discussions are now realtime.  Comment threads work like a chat application with student responses to each other appearing immediately.   Visual and audio notifications inform students (or on-call TAs) when other students post comments "nearby" in the text, to encourage rapid responses</li>
                            <li>To reduce visual clutter, highlights can be collapsed into marks in the margin, so that the text itself is clear but annotations can still be noticed</li>
                            <li>To support instructors who hold online office hours, we've enabled you to record audio as you speak and place it into NB discussion threads</li>
                            <li>We've added a TA role, with a specific ability to escalate comments to the attention of instructors</li>
                            <li>To support social connections, we've made it possible for students to follow other students, and filter the comment list to see comments from those they follow</li>
                            <li>We've added a variety of other methods for sorting and filtering comments, for example by number of upvotes or recency</li>
                        </ul>
                    </p>
                </td>
            </tr>
            <tr>
                <td style="text-align: center; height: 30px; background: #4a2270; align-items: center; margin: 0 0 30px 0; color:#ffffff; font-size: 10px;">
                    <span>To unsubscribe from NB Tips & Tricks emails click <a style="color: #ffffff; font-size: 10px;" href="${EmailUtil.generateUnsubscribeLink(userId, emailType)}">here</a></span>
                </td>
            </tr>
        </table>
    </body>
    </html>    `

  return emailHtml
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchAllInstructors() {
    const nbInstructors = await Sequelize.query(`select distinct user_id as id, users.email
    from instructors, users
    where instructors.user_id = users.id;`)
    return nbInstructors[0]
}

async function run() {
    const users = []

    // get all instructors
    const instructors = await fetchAllInstructors()

    for (const inst of instructors) {
        users.push(inst)
    }

    let counter = 0

    for (const u of users) {
        ++counter

        // to skip, in case the script stopped
        if (counter < 1) {
            continue
        }

       await sleep(20000) 
       console.log(`SENDING ${counter} / ${users.length}:  ${u.id} ${u.email}`);

        const email = new EmailUtil().to(u.email).subject(SUBJECT).userId(u.id).emailType(EMAIL_TYPE).html(buildEmail(u.id, EMAIL_TYPE))

        try {
            await email.send()
        } catch (error) {
            console.error(error.message);
            break
        }
    }

}

run()