module.exports.template = (body) => {
  console.log(
    "here",
    body?.email,
    body?.password,
    body?.firstName,
    body?.lastName
  );
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Creation Notification</title>
  </head>
  <body style="font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #1e1e1e; color: #ffffff; margin: 0; padding: 0;">
  
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #333; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); border-radius: 5px; margin-top: 20px;">
      <h1 style="color: #ffffff;">Welcome to Monit</h1>
      <p style="color: #bbbbbb;">Dear ${body?.firstName} ${body?.lastName},</p>
      <p style="color: #bbbbbb;">We are pleased to inform you that an administrator has created an account for you at ${body?.companyName}.</p>
      <p style="color: #bbbbbb;">Here are your account details:</p>
      <ul style="color: #bbbbbb;">
        <li>Email: <strong>${body?.email}</strong></li>
        <li>Password: <strong>${body?.password}</strong> (You will be prompted to change this on your first login for security reasons.)</li>
      </ul>
      <p style="color: #bbbbbb;">You can log in to your account using the provided credentials and access our services.</p>
      <p style="color: #bbbbbb;">If you have any questions or need assistance, please feel free to contact our support team at [Support Email or Phone Number].</p>
      <p style="color: #bbbbbb;">Thank you for choosing Monit. We look forward to serving you!</p>
      <div style="margin-top: 20px; text-align: center; color: #777;">
        <p>Best Regards,<br>Monit Team</p>
      </div>
    </div>
  
  </body>
  </html>
  `;
};
