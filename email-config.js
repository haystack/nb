require('dotenv').config()
const nodemailer = require("nodemailer")
const htmlToText = require('nodemailer-html-to-text').htmlToText

let options

if (process.env.NODE_ENV === 'dev' ) {
    options = {
        host: 'localhost',
        port: 1025,
        auth: {
            user: 'project.1',
            pass: 'secret.1'
        }
    }
} else {
    options = {
        host: "outgoing.csail.mit.edu",
        port: 587,
    }
}

const transporter = nodemailer.createTransport(options)
transporter.use('compile', htmlToText())
module.exports = transporter