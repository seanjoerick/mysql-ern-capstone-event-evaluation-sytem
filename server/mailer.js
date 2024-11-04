import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

export const sendNewPasswordEmail = async (recipientEmail, newPassword) => {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5;">
            <h2>Password Reset Confirmation</h2>
            <p>Hi there,</p>
            <p>We received a request to reset the password for your account associated with the email address <strong>${recipientEmail}</strong>.</p>
            <p>Your new password is: <strong>${newPassword}</strong></p>
            <p>Please log in using this password and remember to change it to something more memorable after your first login.</p>
            <p>For your security, we recommend that you:</p>
            <ul>
                <li>Change your password immediately after logging in.</li>
                <li>Use a unique password that you do not use for any other accounts.</li>
            </ul>
            <p>If you did not request this password reset, please ignore this email. If you have any concerns, feel free to reach out to our support team.</p>
            <p>Thank you for your attention!</p>
            <p>Best regards,<br>The Support Team</p>
        </div>
    `;

    const mailOptions = {
        from: `"Support Team" <${process.env.APP_EMAIL}>`,
        to: recipientEmail,
        subject: 'Your New Password',
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`New password email sent successfully to: ${recipientEmail}`);
    } catch (error) {
        console.error(`Error sending new password email to ${recipientEmail}:`, error.message);
    }
};



// Function to format the date
const formatEventDate = (eventDate) => {
    const date = new Date(eventDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Function to send reminder emails with HTML formatting
export const sendReminderEmail = async (recipientEmail, eventTitle, eventStartDate) => {
    const formattedStartDate = formatEventDate(eventStartDate);
    
    // HTML template for the email with logo
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center;">
                    <img src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" alt="Trimex College Logo" style="max-width: 150px; margin-bottom: 20px;">
                </div>
                <h2 style="color: #333; text-align: center;">Event Reminder</h2>
                <p style="color: #555;">Hello students,</p>
                <p style="color: #555;">This is a reminder for the upcoming event:</p>
                <h3 style="color: #007bff;">${eventTitle}</h3>
                <p style="color: #555;">
                    <img src="https://img.icons8.com/ios-filled/50/000000/planner.png" alt="Calendar Icon" style="width: 20px; vertical-align: middle; margin-right: 5px;">
                    <strong>Date:</strong> ${formattedStartDate}
                </p>
                <p style="color: #555;">We look forward to your participation!</p>
                <p style="color: #555;">Thank you!<br><strong>Event Organizer</strong></p>
                <hr style="border-top: 1px solid #eee;">
                <footer style="color: #aaa; text-align: center;">
                    <p>If you have any questions, feel free to reply to this email.</p>
                </footer>
            </div>
        </div>
    `;

    const mailOptions = {
        from: `"Event Organizer" <${process.env.APP_EMAIL}>`,
        to: recipientEmail,
        subject: `Reminder: Upcoming Event - ${eventTitle}`,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
