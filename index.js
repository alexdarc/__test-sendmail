'use strict';
const nodemailer = require('nodemailer');
const fs = require('fs');

function getEmailData() {
  let dirname = ".preview";

  if (!fs.existsSync(dirname + "/subject.txt"))
    throw("File subject.txt not found");

  if (!fs.existsSync(dirname + "/html.html"))
    throw("File html.html not found");

  if (!fs.existsSync(dirname + "/text.txt"))
    throw("File text.txt not found");

  return {
    subject: fs.readFileSync(dirname + "/subject.txt", "utf-8"),
    text: fs.readFileSync(dirname + "/text.txt", "utf-8"),
    html: fs.readFileSync(dirname + "/html.html", "utf-8")
  };
}

let transporter = nodemailer.createTransport({
  host: 'mail.int.retailrocket.ru',
  port: 25,
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

let mailOptions = Object.assign({
  from: '"Retail Rocket Test 👻" <hopheylailaley@retailrocket.io>',
  to: 'alex.dark.kim.runme@previews.emailonacid.com'
}, getEmailData());

transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
});