const nodemailer = require("nodemailer");
const { template } = require("../lang/template");

module.exports.sendEmail = async (body) => {
  try {
    // Create a nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT, // Your SMTP server port
      secure: false, // Set to true if using SSL/TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    console.log(
      template(),
      body,
      process.env.SMTP_HOST,
      process.env.SMTP_PORT,
      process.env.SMTP_USER,
      process.env.SMTP_PASSWORD
    );
    // Setup email data
    console.log(body, "body");
    const mailOptions = {
      from: "salar@gmail.com",
      to: body?.email,
      subject: "Account Creation Notification",
      html: template(body),
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
    return;
  } catch (error) {
    console.log(error, "error");
    return;
  }
};
