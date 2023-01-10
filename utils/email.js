const transporter = require('../email-config');

class Email {
    constructor() {
        this.__from = 'NB Mailer <nb2.mailer@csail.mit.edu>'
        this.__to = undefined
        this.__subject = undefined
        this.__text = undefined
        this.__html = undefined
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

    async send() {
        const options = {
            from: this.__from,
            to: this.__to.toLowerCase(),
            subject: this.__subject,
            html: this.__html
        }
    
        try {
            const info = await transporter.sendMail(options)
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.log("Error sending mail: " + error);

        }    
    }

}

module.exports = Email