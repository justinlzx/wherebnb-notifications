import Res from '../Res/response.js';
import { sendNotification } from '../service/notif.service.js';
import dotenv from 'dotenv'
dotenv.config();
// import { emailTemplates } from '../emailTemplates' //revisit this pls 

//send email 
export const notifController = async (req, res) => {

    let emailSubject, emailRecipient, emailContent;

    try {
        const payload = req.body;
        const emailType = payload.emailType;


        //check email type
        if( emailType == "travelerBookingConfirmation" ){
            emailSubject = "[WhereBnB] Your Booking Confirmation"
            emailRecipient = payload.recipient
            emailContent = "<h1> Testing </h1>"
        }
        if( emailType == "hostBookingConfirmation" ){
            emailSubject = "[WhereBnB] Your Property Has Been Booked"
            emailRecipient = payload.recipient
            emailContent = "<h1> Testing </h1>"
        }
        if( emailType == "hostReview" ){
            emailSubject = "[WhereBnB] New Review Published"
            emailRecipient = payload.recipient
            emailContent = "<h1> Testing </h1>"
        }
        if( emailType == "travelerCheckIn" ){
            emailSubject = "[WhereBnB] Check In Instructions"
            emailRecipient = payload.recipient
            emailContent = "<h1> Testing </h1>"
        }
        if( emailType == "hostCheckIn" ){
            emailSubject = "[WhereBnB] Your Guest Has Checked In"
            emailRecipient = payload.recipient
            emailContent = "<h1> Testing </h1>"
        }
        //from email type 
        let details = {
            from: process.env.EMAIL_USERNAME,
            to: emailRecipient,
            subject: emailSubject,
            html: emailContent
        }
        console.log(details) 
        const result = await sendNotification(details);
        return Res.successResponse(res, result)
    } catch (error) {
        return Res.errorResponse(res, error)
    };
}

