const nodemailer = require("nodemailer");

const sendMaile = async (email, subjuct, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GOOGLE_KEY,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: subjuct,
      html: html,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("nodemailer error");
  }
};

module.exports = sendMaile;
