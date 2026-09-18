import nodemailer from 'nodemailer'

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'muhammadahadansari2@gmail.com',
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: 'muhammadahadansari2@gmail.com',
            to: email,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error(error);
    }
} 
