const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

app.post('/sendmail', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const mailOptions = {
            from: `${name} <${email}>`,
            to: process.env.EMAIL,
            subject: `Contact Form: ${subject}`,
            text: `You received a new message from ${name} (${email}):\n\n${message}`,
            replyTo: email
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Error sending email." });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
