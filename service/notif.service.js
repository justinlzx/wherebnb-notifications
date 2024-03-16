import dotenv from 'dotenv'
import nodemailer from 'nodemailer';

dotenv.config();

const email_subject = "hello"
const email_text = "testing"

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD 
    }
})

export function sendNotification( details ) {
    return new Promise((resolve, reject) => {
        mailTransporter.sendMail(details, (err, info) => {
            if(err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}