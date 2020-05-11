const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bd301d56fd5a78",
      pass: "1ca054abcff456"
    }
  });  