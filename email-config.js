const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "outgoing.csail.mit.edu",
    port: 587,
});
module.exports = transporter;