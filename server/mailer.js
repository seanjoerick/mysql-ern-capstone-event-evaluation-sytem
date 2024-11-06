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
        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.5; padding: 20px; text-align: center;">
            <img src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" alt="Trimex College Logo" style="max-width: 150px; margin-bottom: 20px;">
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.5; padding: 20px; font-size: 18px; text-align: center;">
            Hi there,
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.8; padding: 10px 20px; font-size: 16px; text-align: center;">
            We received a request to reset the password for your account associated with the email address <strong>${recipientEmail}</strong>.
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            Your new password is: <strong>${newPassword}</strong>
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            Please log in using this password and remember to change it to something more memorable after your first login.
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            For your security, we recommend that you:
        </p>

        <ul style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            <li>Change your password immediately after logging in.</li>
            <li>Use a unique password that you do not use for any other accounts.</li>
        </ul>

        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            If you did not request this password reset, please ignore this email. If you have any concerns, feel free to reach out to our support team.
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            Thank you for your attention!<br>Best regards,<br><strong>The Support Team</strong>
        </p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

        <p style="font-family: 'Arial', sans-serif; color: #777; font-size: 12px; line-height: 1.5; padding: 20px; text-align: center;">
            <em>This is an automated message. Please do not reply to this email.</em>
        </p>
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
        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.5; padding: 20px; text-align: center;">
            <img src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" alt="Trimex College Logo" style="max-width: 150px; margin-bottom: 20px;">
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.5; padding: 20px; font-size: 18px; text-align: center;">
            Hello students,
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.8; padding: 20px; font-size: 16px; text-align: center;">
            We hope this message finds you well! We are excited to remind you about the upcoming event:
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #007bff; line-height: 1.5; padding: 10px 20px; font-size: 20px; font-weight: bold; text-align: center;">
            ${eventTitle}
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #555; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            <img src="https://img.icons8.com/ios-filled/50/000000/planner.png" alt="Calendar Icon" style="width: 20px; vertical-align: middle; margin-right: 10px;">
            <strong>Date:</strong> ${formattedStartDate}
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #555; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            This event promises to be a valuable experience, offering a range of opportunities to learn, connect, and grow.
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #555; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            Don't miss out on this chance to engage with experts and fellow students. Whether you're looking to gain new insights or simply connect with others in your field, there's something for everyone.
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #555; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            If you have any questions or need further information about the event, please do not hesitate to contact the event organizer.
        </p>

        <p style="font-family: 'Arial', sans-serif; color: #555; line-height: 1.8; padding: 10px 20px; font-size: 16px;">
            We look forward to your participation!<br><strong>Event Organizer</strong>
        </p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

        <p style="font-family: 'Arial', sans-serif; color: #777; font-size: 12px; line-height: 1.5; padding: 20px; text-align: center;">
            <em>This is an automated message. Please do not reply to this email.</em>
        </p>
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
