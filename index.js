import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
import { getBookingConfirmation, getHostNotification, getReviewNotification } from './src/emailText

dotenv.config();


//need to import and configure email_subject and email_text 

const email_subject = "hello"
const email_text = "testing"
//import nodemailer
// const nodemailer = require('nodemailer')

//create transporter, lets u send mail
let mailTransporter = nodemailer.createTransport({
    service: "gmail",

    //this is email account 
    auth: {
        user: process.env.EMAIL_USERNAME, //email address
        pass: process.env.EMAIL_PASSWORD //password 
    }
})
console.log(process.env.EMAIL_USERNAME)
let details = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.TEST_EMAIL,
    subject: email_subject,
    text: email_text
}

//this makes u send the mail and takes a callback 
mailTransporter.sendMail(details, (err)=>{
    if(err){
        console.log("error", err)
    }else{
        console.log("email has sent")
    }
}) 