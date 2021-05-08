let nodemailer = require("nodemailer");

module.exports = {
  registerMail: (mail, username, link) => {
    var message =
      `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>Hi ` +
      username +
      `,</p>
        <br>
        <p>We have received your registration on ChickFling.</p>
        <p>We hope you will find what you are looking for on our platform.</p>
        <p>To get started on ChickFling, please make sure to validate the following link: <a href="` +
      link +
      `">Click here</a></p>
        <br>
        <p>See you soon on ChickFling.</p>
      </body>
    </html>`;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      type: "SMTP",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use SSL
      auth: {
        user: 'chickfling001@gmail.com',
        pass: 'Chickfling01@'
      }
    });
    
    var mailOptions = {
      from: "chickfling001@gmail.com",
      to: mail,
      subject: "ChickFling - Confirm mail",
      text: message,
      contentType: "text/html"
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent');
      }
    });
  },

  forgotPasswordMail: (mail, username, link) => {
    var message =
      `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>Hi ` +
      username +
      `,</p>
        <br>
        <p>We have received your password reset request on ChickFling.</p>
        <p>Don't worry we got you covered ;)</p>
        <p>To reset your password on ChickFling, please visit the following link: <a href="` +
      link +
      `">Click here</a></p>
        <br>
        <p>See you soon on ChickFling.</p>
      </body>
    </html>`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      type: "SMTP",
      host: "smtp.gmail.com",
      post: 587,
      secure: false, //use SSL
      auth: {
        user: 'chickfling001@gmail.com',
        pass: 'Chickfling01@'
      }
    });
    
    var mailOptions = {
      from: "chickfling001@gmail.com",
      to: mail,
      subject: "ChickFling - Reset password",
      text: message,
      contentType: "text/html"
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent');
      }
    });
  }
};
