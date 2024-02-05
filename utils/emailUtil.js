const transporter = require('../email-config');
const UserEmailPreference = require('../models').UserEmailPreference

class EmailUtil {
    constructor() {
        this.__from = 'NB Mailer <nb2.mailer@csail.mit.edu>'
        this.__to = undefined
        this.__subject = undefined
        this.__text = undefined
        this.__html = undefined
        this._userId = undefined
        this._emailType = undefined
    }

    from(from) {
        if (!from) return this.__from
        this.__from = from
        return this
    }

    to(to) {
        if (!to) return this.__to
        this.__to = to
        return this
    }

    subject(subject) {
        if (!subject) return this.__subject
        this.__subject = subject
        return this
    }

    text(text) {
        if (!text) return this.__text
        this.__text = text
        return this
    }

    html(html) {
        if (!html) return this.__html
        this.__html = html
        return this
    }

    userId(userId) {
        if (!userId) return this._userId
        this._userId = userId
        return this
    }

    emailType(emailType) {
        if (!emailType) return this._emailType
        this._emailType = emailType
        return this
    }

    async isUserSubscribed() {
        try {
            const item = await UserEmailPreference.findOne({where: {user_id:this._userId, email_type_id: this._emailType}})
                
            if (item) {
                return item.status === 'ENABLE' ? true : false
            }

            return true

        } catch (error) {
            console.error(error);
            return false
        }
    }

    static generateUnsubscribeLink(userId, emailType) {
        return `https://nb.mit.edu/unsubscribe?token=${encodeURIComponent(Buffer.from(`${userId}:${emailType}`).toString('base64'))}`
    }

    async send() {

        if (!this._userId || !this._emailType) {
            throw Error('User id and email type are required!')
        }

        if (this._emailType === 'SYSTEM' || await this.isUserSubscribed()) {
            const unsubscribeLink = EmailUtil.generateUnsubscribeLink(this._userId, this._emailType)

            const options = {
                from: this.__from,
                to: this.__to.toLowerCase(),
                subject: this.__subject,
                html: this.__html,
                list: {
                    unsubscribe: {
                        url: unsubscribeLink,
                        comment: 'Unsubscribe' 
                    }
                }
            }
        
            try {
                const info = await transporter.sendMail(options)
                console.log('Email sent: ' + info.response);
            } catch (error) {
                console.log("Error sending mail: " + error);
    
            }    
        } else {
            console.warn(`User: ${this._userId} not subscribed to: ${this._emailType}`);
        }
    
    }

}

module.exports = EmailUtil