const nodemailer = require("nodemailer");

const sendEmail = async (data, title) => {
  // console.log(data);
  const output = `
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${data.name}</li>
    <li>Phone Number: ${data.phone}</li>
    <li>Message: ${data.message}</li>
    <li>Email: ${data.email}</li>
  </ul>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "abhishekdemo12@gmail.com",
      pass: "brsmhwlwqivefxfx",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // console.log(name);
  const mailOptions = {
    // from: data.name,
    to: "sayog.smarttechnica@gmail.com",
    subject: title,
    html: output,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
