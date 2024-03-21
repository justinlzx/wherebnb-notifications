import Res from '../Res/response.js';
import { sendNotification } from '../service/notif.service.js';
import { startConsumer } from '../service/consumer.js';


import dotenv from 'dotenv'
dotenv.config();

//send email 
export const notifController = async (req, res) => {
    try {
        // const payload = req.body;
        console.log("getting latest message")
        let payload = req.body
        const emailType = payload.emailType;
        let details = []

        let travelerEmailRecipient = payload.travelerEmail
        let travelerName = payload.travelerName
        let bookingDates = payload.bookingDates
        let totalPrice = payload.totalPrice
        let country = payload.country
        let propertyName = payload.propertyName
        let instructions = payload.instructions
        let hostName = payload.hostName
        let hostEmailRecipient = payload.hostEmail

        //check email type to send corresponding template
        if( emailType == "bookingConfirmation" ){
            let travelerEmailSubject = "[WhereBnB] Booking Confirmation"
            let travelerEmailContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }
                        .content {
                            padding: 20px;
                        }
                        .footer {
                            padding: 20px;
                            text-align: center;
                            font-size: 0.8em;
                            color: #888;
                        }
                    </style>
                </head>
                <body>
                    <div class="content">
                        <h1>Booking Confirmation</h1>
                        <p>Hello ${travelerName}, you're going to ${country}!</p>
                        <p>Here are your booking details:</p>
                        <h3>${propertyName}</h3>
                        <p>Country: ${country}</p>
                        <p>Dates: ${bookingDates}</p>
                        <p>Total Price: ${totalPrice}</p>
                        <p>We look forward to hosting you!</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply.</p>
                    </div>
                </body>
                </html>
                `;

            let hostEmailSubject = "[WhereBnB] Your Property Has Been Booked"
            let hostEmailContent = "<h1> Testing </h1>"

            let travelerObject = {
                from: process.env.EMAIL_USERNAME,
                to: travelerEmailRecipient,
                subject: travelerEmailSubject,
                html: travelerEmailContent,
                // images to be attached here
                attachments: [{
                    filename: 'bookingsuccess.jpg',
                    path: '../assets/bookingsuccess.jpg', // the path to the image in your project directory
                    cid: 'bookingsuccessjpg' // can be any unique string
                },
                {
                    filename: 'long-logo.png',
                    path: '../assets/long-logo.png', // the path to image2.jpg in your project directory
                    cid: 'longlogopng' // a unique CID for the second image
                }
            ]
            }
            let hostObject = {
                from: process.env.EMAIL_USERNAME,
                to: hostEmailRecipient,
                subject: hostEmailSubject,
                html: hostEmailContent,
                // images to be attached here
                attachments: [{
                    filename: 'bookingsuccess.jpg',
                    path: '../assets/bookingsuccess.jpg', // the path to the image in your project directory
                    cid: 'bookingsuccessjpg' // can be any unique string
                },
                {
                    filename: 'long-logo.png',
                    path: '../assets/long-logo.png', // the path to image2.jpg in your project directory
                    cid: 'longlogopng' // a unique CID for the second image
                }
            ]
            }
            details.push(travelerObject)
            details.push(hostObject)
        }

        if( emailType == "hostReview" ){
            let emailSubject = "[WhereBnB] New Review Published"
            let reviewEmail = "<h1> Testing </h1>"

            let reviewObject = {
                from: process.env.EMAIL_USERNAME,
                to: hostEmailRecipient,
                subject: emailSubject,
                html: reviewEmail
            }

            details.push(reviewObject)
        }

        if( emailType == "checkIn" ){
            let travelerEmailSubject = "[WhereBnB] Check In Instructions"
            let travelerEmailContent = "<h1> Testing </h1>"
  

            let hostEmailSubject = "[WhereBnB] Your Guests Have Checked In "
            let hostEmailContent = "<h1> Testing </h1>"

            let travelerObject = {
                from: process.env.EMAIL_USERNAME,
                to: travelerEmailRecipient,
                subject: travelerEmailSubject,
                html: travelerEmailContent
            }
            let hostObject = {
                from: process.env.EMAIL_USERNAME,
                to: hostEmailRecipient,
                subject: hostEmailSubject,
                html: hostEmailContent
            }

            details.push(travelerObject)
            details.push(hostObject)
        }

        console.log(details) 
        const result = await sendNotification(details);
        return Res.successResponse(res, result)
    } catch (error) {
        return Res.errorResponse(res, error)
    };
}

