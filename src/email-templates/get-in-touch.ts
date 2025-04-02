// const nodemailer = require('nodemailer');
// require('dotenv').config();

// export const getInTouchEmail = async (user: {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       host: 'smtp.gmail.com',
//       secure: false,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
//     const options = {
//       from: process.env.EMAIL,
//       to: `${user.email}`,
//       subject: `${user.subject}`,

//       html: `
//       <!DOCTYPE html>
//     <html>
//   <head>
//     <meta charset="UTF-8" />
//     <title>New Contact Request</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         background-color: #f4f4f4;
//         padding: 20px;
//         display: flex;
//         justify-content: center;
//         width: 100%;
//       }
//       .container {
//         flex: 1;
//         max-width: 600px;
//         background: #ffffff;
//         padding: 20px;
//         border-radius: 8px;
//         box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//       }
//       .header {
//         text-align: center;
//         margin-bottom: 20px;
//       }
//       .logo {
//         max-width: 150px;
//       }
//       h2 {
//         color: #333;
//         text-align: center;
//       }
//       .details {
//         padding: 10px;
//         background: #f9f9f9;
//         border-radius: 5px;
//         margin-top: 15px;
//       }
//       p {
//         color: #555;
//         line-height: 1.6;
//       }
//       .footer {
//         margin-top: 20px;
//         font-size: 12px;
//         color: #888;
//         text-align: center;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <!-- Company Logo -->
//       <div class="header">
//         <img src="{{companyLogo}}" alt="Company Logo" class="logo" />
//       </div>

//       <h2>New Contact Request</h2>
//       <p><strong>Date of Request:</strong> {{date}}</p>

//       <!-- Sender Details -->
//       <div class="details">
//         <p><strong>Sender Details:</strong></p>
//         <p><strong>Name:</strong> ${user.name}</p>
//         <p><strong>Email:</strong> ${user.email}</p>
//         <p><strong>Subject:</strong> ${user.subject}</p>
//       </div>

//       <p><strong>Message:</strong></p>
//       <p>${user.message}</p>

//       <hr />
//       <p class="footer">This email was sent via your contact form.</p>
//     </div>
//   </body>
// </html>

//       `,
//     };

//     const emailSent = await transporter.sendMail(options);
//     console.log(emailSent);
//   } catch (error) {
//     console.log(error);
//   }
// };

const nodemailer = require('nodemailer');
require('dotenv').config();

export const getInTouchEmail = async (user: {
  name: string;
  email: string;
  subject: string;
  message: string;
  attachment?: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
    size?: number;
  };
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Request</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        background-color: #f5f7fa;
        padding: 40px 0;
        width: 100%;
        color: #333;
        line-height: 1.6;
      }
      .wrapper {
        width: 100%;
        max-width: 650px;
        margin: 0 auto;
      }
      .container {
        background: #ffffff;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 25px;
        border-bottom: 1px solid #f0f0f0;
      }
      .logo {
        max-width: 180px;
        margin-bottom: 20px;
      }
      h2 {
        color: #1a1a1a;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 5px;
        letter-spacing: -0.02em;
      }
      .request-date {
        color: #5f6368;
        font-size: 14px;
        font-weight: 500;
      }
      .content-section {
        margin-bottom: 30px;
      }
      .section-title {
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 12px;
      }
      .sender-details {
        background: #f8fafc;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 30px;
      }
      .details-grid {
        display: grid;
        grid-template-columns: 100px 1fr;
        gap: 8px 16px;
      }
      .detail-label {
        color: #64748b;
        font-size: 14px;
        font-weight: 500;
      }
      .detail-value {
        color: #334155;
        font-size: 15px;
        font-weight: 500;
      }
      .message-content {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 20px;
        color: #334155;
        font-size: 15px;
        margin-bottom: 30px;
      }
      .attachment-info {
        margin-top: 5px;
        padding: 15px 20px;
        background: #f0f9ff;
        border-radius: 10px;
        border-left: 4px solid #0ea5e9;
        display: flex;
        align-items: center;
      }
      .attachment-icon {
        margin-right: 12px;
        color: #0ea5e9;
        font-size: 18px;
      }
      .attachment-name {
        font-size: 15px;
        font-weight: 500;
        color: #0369a1;
      }
      .divider {
        height: 1px;
        background: #e5e7eb;
        margin: 30px 0;
      }
      .footer {
        font-size: 13px;
        color: #64748b;
        text-align: center;
      }
      .highlight {
        color: #0284c7;
      }
      @media only screen and (max-width: 600px) {
        .container {
          padding: 25px;
        }
        .details-grid {
          grid-template-columns: 1fr;
          gap: 4px;
        }
        .detail-label {
          margin-top: 8px;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <!-- Header Section -->
        <div class="header">
          <img src="{{companyLogo}}" alt="Company Logo" class="logo" />
          <h2>New Contact Request</h2>
          <div class="request-date">Received on <span class="highlight">{{date}}</span></div>
        </div>
        
        <!-- Sender Details Section -->
        <div class="content-section">
          <div class="section-title">Sender Information</div>
          <div class="sender-details">
            <div class="details-grid">
              <div class="detail-label">Name</div>
              <div class="detail-value">${user.name}</div>
              
              <div class="detail-label">Email</div>
              <div class="detail-value">${user.email}</div>
              
              <div class="detail-label">Subject</div>
              <div class="detail-value">${user.subject}</div>
            </div>
          </div>
        </div>
        
        <!-- Message Section -->
        <div class="content-section">
          <div class="section-title">Message</div>
          <div class="message-content">
            ${user.message.replace(/\n/g, '<br>')}
          </div>
          
          <!-- Attachment Section (if present) -->
          ${
            user.attachment
              ? `
          <div class="attachment-info">
            <div class="attachment-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"></path>
              </svg>
            </div>
            <div class="attachment-name">${user.attachment.filename}</div>
          </div>
          `
              : ''
          }
        </div>
        
        <div class="divider"></div>
        
        <!-- Footer -->
        <div class="footer">
          This message was sent through your contact form. Please do not reply directly to this email.
        </div>
      </div>
    </div>
  </body>
</html>
      `,
      attachments: user.attachment
        ? [
            {
              filename: user.attachment.filename,
              content: user.attachment.content,
              contentType: user.attachment.contentType,
            },
          ]
        : [],
    };

    // Add date variable replacement
    const currentDate = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    options.html = options.html.replace('{{date}}', currentDate);

    // Replace company logo placeholder (assuming you store this in environment variable)
    options.html = options.html.replace(
      '{{companyLogo}}',
      process.env.COMPANY_LOGO_URL || ''
    );

    const emailSent = await transporter.sendMail(options);
    console.log(emailSent);
    return emailSent;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error so calling functions know something went wrong
  }
};
