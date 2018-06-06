const nodemailer = require('nodemailer');

// 引数を受ける
const [MS_MAIL_ADDRESS, MS_PASS, CONFIRM_MAIL_ADDRESS] = process.argv.slice(2);
if (!MS_MAIL_ADDRESS || !MS_PASS || !CONFIRM_MAIL_ADDRESS) {
  console.log('USAGE: node app.js MS_MAIL_ADDRESS MS_PASS CONFIRM_MAIL_ADDRESS');
  process.exit(0);
}
if (!MS_MAIL_ADDRESS.includes('@') || !CONFIRM_MAIL_ADDRESS.includes('@')) {
  console.log('invalid address');
  process.exit(0);
}

// SMTP接続情報を用意する
const smtp = nodemailer.createTransport({
  host: 'smtp.office365.com',
  auth: {
    user: MS_MAIL_ADDRESS,
    pass: MS_PASS,
    port: '587'
  }
});

// メールの内容を用意する
const mailOptions = {
  from: MS_MAIL_ADDRESS,
  to: CONFIRM_MAIL_ADDRESS,
  subject: 'ログイン通知',
  text: 'ログインできたよ',
  html: '<b>ログインできたよ</b>'
};

// メールを送信する
smtp.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Message sent: ' + info.message);
  }
  smtp.close();
});
