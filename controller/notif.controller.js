import Res from '../Res/response.js';
import { sendNotification } from '../service/notif.service.js';
import { startConsumer } from '../service/consumer.js';


import dotenv from 'dotenv'
dotenv.config();
// import { emailTemplates } from '../emailTemplates' //revisit this pls 


startConsumer((jsonMsg) => {
    console.log('New message received:', jsonMsg);
    let payload = jsonMsg
});


//send email 
export const notifController = async (req, res) => {


    try {
        // const payload = req.body;
        const emailType = payload.emailType;
        let details = []

        //check email type to send corresponding template
        if( emailType == "bookingConfirmation" ){
            let travelerEmailSubject = "[WhereBnB] Your Booking Confirmation"
            let travelerEmailRecipient = payload.travelerEmail
            let travelerName = payload.travelerName
            let bookingDates = payload.bookingDates
            let totalPrice = payload.totalPrice
            let travelerEmailContent = "<h1> Testing </h1>"

            let hostEmailSubject = "[WhereBnB] Your Property Has Been Booked"
            let hostName = payload.hostName
            let hostEmailRecipient = payload.hostEmail
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

        if( emailType == "hostReview" ){
            let emailSubject = "[WhereBnB] New Review Published"
            let hostName = payload.hostName
            let emailRecipient = payload.recipient
            let emailContent = "<h1> Testing </h1>"

            let reviewObject = {
                from: process.env.EMAIL_USERNAME,
                to: emailRecipient,
                subject: emailSubject,
                html: emailContent
            }

            details.push(reviewObject)
        }

        if( emailType == "checkIn" ){
            let travelerEmailSubject = "[WhereBnB] Check In Instructions"
            let travelerName = payload.travelerName
            let travelerEmailRecipient = payload.travelerName
            let travelerEmailContent = "<h1> Testing </h1>"
            let instructions = payload.instructions

            let hostEmailSubject = "[WhereBnB] Your Guests Have Checked In "
            let hostname = payload.hostName
            let hostEmailRecipient = payload.hostName
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

