const nodemailer = require('nodemailer');
require('dotenv').config();

export const getInTouchEmail = async (user: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
    const options = {
      from: process.env.EMAIL,
      to: `${user.email}`,
      subject: `${user.subject}`,

      html: `
      <!DOCTYPE html>
    <html>
  <head>
    <meta charset="UTF-8" />
    <title>New Contact Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
        display: flex;
        justify-content: center;
        width: 100%;
      }
      .container {
        flex: 1;
        max-width: 600px;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo {
        max-width: 150px;
      }
      h2 {
        color: #333;
        text-align: center;
      }
      .details {
        padding: 10px;
        background: #f9f9f9;
        border-radius: 5px;
        margin-top: 15px;
      }
      p {
        color: #555;
        line-height: 1.6;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Company Logo -->
      <div class="header">
        <img src="{{companyLogo}}" alt="Company Logo" class="logo" />
      </div>

      <h2>New Contact Request</h2>
      <p><strong>Date of Request:</strong> {{date}}</p>

      <!-- Sender Details -->
      <div class="details">
        <p><strong>Sender Details:</strong></p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Subject:</strong> ${user.subject}</p>
      </div>

      <p><strong>Message:</strong></p>
      <p>${user.message}</p>

      <hr />
      <p class="footer">This email was sent via your contact form.</p>
    </div>
  </body>
</html>

      `,
    };

    const emailSent = await transporter.sendMail(options);
    console.log(emailSent);
  } catch (error) {
    console.log(error);
  }
};
