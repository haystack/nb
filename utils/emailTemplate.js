const EmailUtil = require('./emailUtil')

function buildThreadNewReplyEmail(userId, emailType, replyAuthor, replyUrl, replyText) {
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
                        <img  style="height: 70px" src="https://nb.mit.edu/res/nb-logo-small.png"/>
                    </a>
                </td>
            </tr>
            <tr>
                <td  style="text-align: center; padding: 30px 20px; align-items: center;">
                    <p>💬 New reply from <b>${replyAuthor}</b>:</p>
                    <p style="background: #e1e6eb; padding: 15px">${replyText}</p>
                    <p>Go to <b><a style="color: #4a2270" href="${replyUrl}">Thread</a></b></p>
                </td>
            </tr>
            <tr>
                <td style="text-align: center; height: 30px; background: #4a2270; align-items: center; margin: 0 0 30px 0; color:#ffffff; font-size: 10px;">
                    <span>To unsubscribe from <b>New Reply</b> emails click <a style="color: #ffffff; font-size: 10px;" href="${EmailUtil.generateUnsubscribeLink(userId, emailType)}">here</a></span>
                </td>
            </tr>
        </table>
    </body>
    </html>    
    `

    return emailHtml
}

module.exports = { buildThreadNewReplyEmail }