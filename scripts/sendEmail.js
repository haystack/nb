const EmailUtil = require('../utils/emailUtil')
const Class = require('../models').Class;


const CLASS_ID = '91416f40-8bcb-11ed-9f95-a74688ce4250'
const EMAIL_TYPE = 'TIPSANDTRICKS'

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
            <tr>
                <td  style="text-align: center; padding: 30px 20px; align-items: center;">
                    <h1>👋 Hello from NB!</h1>
                    <p>We are excited to have you with us.<br>These are some points you may find helpful.</p>
                </td>
            </tr>
            <tr style="margin-top: 25px;">
                <td style="border-top: 1px solid #000000; padding: 10px;">
                    <h1>☄️ Interactions</h1>
                    <div style="text-align: center;"><img style="width:550px;" src="https://nb.mit.edu/email/spotlights/nb_actions.png" /></div>
                    <p style="color: #000000;">
                        <b style="color: #4a2270;">Click on the comments you like and interact with your colleagues by:</b>
                        <ol style="color: #000000;">
                            <li><b>reply</b>,</li>
                            <li>giving them a <b>like</b>,</li>
                            <li>help them get a reply</li>
                            <li><b>bookmark</b> that comment to read later or</li>
                            <li><b>follow</b> them.</li>
                        </ol>
                    </p>
                </td>
            </tr>
            <tr style="margin-top: 25px;">
                <td style="border-top: 1px solid #000000; padding: 10px;">
                    <h1>☀️ Spotlights</h1>
                    <div style="text-align: center;"><img style="width:550px;" src="https://nb.mit.edu/email/spotlights/nb_spotlights.png" /></div>
                    <p style="color: #000000;">
                        <b style="color: #4a2270;">Spotlights are comments from the reading and each spotlight is showing different type of comment:</b>
                        <ol style="color: #000000;">
                            <li>comments from the people you <b>follow</b>,</li>
                            <li>instructor <b>endorsed</b> comments,</li>
                            <li>general comments form the reading and</li>
                            <li>comments with <b>questions</b> that need answers.</li>
                        </ol>
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

async function fetchClassInstructors(classId) {
    const nbClass = await Class.findByPk(classId,{ include: [{ association: 'Instructors', attributes: ['id', 'username', 'first_name', 'last_name', 'email'] }] })
    return nbClass.Instructors
}

async function fetchClassStudents(classId) {
    const nbClass = await Class.findByPk(classId, { include: [{ association: 'Sections', include: [{ association: 'MemberStudents', attributes: ['id', 'username', 'first_name', 'last_name', 'email'] } ] }, ]})
    return nbClass.Sections    
}

async function run() {
    const users = []

    // get all students
    const sections = await fetchClassStudents(CLASS_ID)
    for (const section of sections) {
        for (const st of section?.MemberStudents) {
            users.push(st)
        }
    }

    // get all instructors
    const instructors = await fetchClassInstructors(CLASS_ID)
    for (const inst of instructors) {
        users.push(inst)
    }

    let counter = 0

    for (const u of users) {
        ++counter

        if (counter < 253) {
            continue
        }

        await sleep(20000)
        console.log(`SENDING ${counter} / ${users.length}:  ${u.id} ${u.email}`);

        const email = new EmailUtil().to(u.email).subject('Welcom to NB!').userId(u.id).emailType(EMAIL_TYPE).html(buildEmail(u.id, EMAIL_TYPE))

        try {
            await email.send()
        } catch (error) {
            console.error(error.message);
            break
        }
    }

}

run()