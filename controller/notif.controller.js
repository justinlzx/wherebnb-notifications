import Res from '../Res/response.js';
import { sendNotification } from '../service/notif.service.js';

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


        //check email type to send corresponding template
        if( emailType == "bookingConfirmation" ){
            //get all required info from payload
            let travelerName = payload.travelerName
            let propertyName = payload.propertyName
            let country = payload.country
            let bookingStart = payload.bookingStart
            let bookingEnd = payload.bookingEnd
            let totalPrice = payload.totalPrice
            let hostName = payload.hostName 
            let travelerEmailRecipient = payload.travelerEmail
            let hostEmailRecipient = payload.hostEmail

            let travelerEmailSubject = "[WhereBnB] Booking Confirmation"
            let travelerEmailContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reservation Confirmation</title>
            </head>
            <body style="text-align: center; font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
                <div style="background-color: #fff; padding: 40px; box-sizing: border-box;">
                    <div style="text-align: left;">
                        <img src="cid:longlogopng" alt="Logo" style="width: 120px;">
                        <!-- <img src="cid:longlogopng" alt=""> -->
                    </div>
                    <img src="cid:bookingsuccessjpg" alt="Confirmation Image" style="max-width: 100%; height: auto; margin: 30px 0;">
                    <!-- <img src="cid:bookingsuccessjpg" alt=""> -->
                    <h1 style="color: #333; margin: 0 0 10px 0;">Thank you ${travelerName},</h1>
                    <p style="font-size: 24px; color: #333; margin: 0 0 30px 0;">your reservation is confirmed!</p>
                    <div style="margin-bottom: 50px;">
                        <p style="background-color: #f7f7f7; display: inline-block; padding: 10px 15px; border-radius: 50px; font-size: 14px; color: #555;">Non-cancellable, non-refundable, non-changeable</p>
                    </div>
                    <hr style="border: 0; height: 1px; background-color: #eaeaea; margin: 0;">
            
                    <!-- Unstyled details of booking -->
                    <div style="text-align: left; padding: 40px;">
                        <h3>Here are your booking details:</h3>
                        <h3>${propertyName}</h3>
                        <table style="width: 100%;">
                            <tr>
                                <td style="text-align: left;">Country:</td>
                                <td style="text-align: right;">${country}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Dates:</td>
                                <td style="text-align: right;">${bookingStart} - ${bookingEnd}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Total Price:</td>
                                <td style="text-align: right;">$${totalPrice}</td>
                            </tr>
                        </table>
                        <p style="margin-top: 60px;"><b>Your host ${hostName} looks forward to hosting you!</b></p>
                    </div>
                </div>
                <div style="background-color: #f0f0f0; padding: 10px; text-align: center;">
                    <p style="font-size: 12px; color: #777;">This is an automated message. Please do not reply.</p>
                </div>
            </body>
            </html>
            `

            let hostEmailSubject = "[WhereBnB] Your Property Has Been Booked"
            let hostEmailContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Booking Notification for Host</title>
            </head>
            <body style="text-align: center; font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
                <div style="background-color: #fff; padding: 40px; box-sizing: border-box;">
                    <div style="text-align: left;">
                        <img src="cid:longlogopng" alt="Logo" style="width: 120px;">
                        <!-- <img src="cid:longlogopng" alt=""> -->
                    </div>
                    <img src="cid:bookingsuccessjpg" alt="Booking Success Image" style="max-width: 100%; height: auto; margin: 30px 0;">
                    <!-- <img src="cid:bookingsuccessjpg" alt=""> -->
                    <h1 style="color: #333; margin: 0 0 10px 0;">Hello ${hostName},</h1>
                    <p style="font-size: 24px; color: #333; margin: 0 0 30px 0;">you have a new reservation!</p>
                    
                    <!-- Styled details of booking -->
                    <div style="text-align: left; padding: 40px;">
                        <h3>Booking details:</h3>
                        <h3>${propertyName}</h3>
                        <table style="width: 100%;">
                            <tr>
                                <td style="text-align: left;">Guest Name:</td>
                                <td style="text-align: right;">${travelerName}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Dates:</td>
                                <td style="text-align: right;">${bookingStart} - ${bookingEnd}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Total Price:</td>
                                <td style="text-align: right;">$${totalPrice}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background-color: #f7f7f7; padding: 20px; text-align: center; margin-top: 40px;">
                        <p>Please ensure the property is ready for your guests and reach out to them if needed.</p>
                    </div>
                </div>
                <div style="background-color: #f0f0f0; padding: 10px; text-align: center;">
                    <p style="font-size: 12px; color: #777;">This is an automated message. Please do not reply.</p>
                </div>
            </body>
            </html>
            
            
            `;

            let travelerObject = {
                from: process.env.EMAIL_USERNAME,
                to: travelerEmailRecipient,
                subject: travelerEmailSubject,
                html: travelerEmailContent,
                // images to be attached here
                attachments: [{
                    filename: 'bookingsuccess.png',
                    path: './assets/bookingsuccess.png', // the path to the image in your project directory
                    cid: 'bookingsuccessjpg' // can be any unique string
                },
                {
                    filename: 'long-logo.png',
                    path: './assets/long-logo.png', // the path to image2.jpg in your project directory
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
                    filename: 'bookingsuccess.png',
                    path: './assets/bookingsuccess.png', // the path to the image in your project directory
                    cid: 'bookingsuccessjpg' // can be any unique string
                },
                {
                    filename: 'long-logo.png',
                    path: './assets/long-logo.png', // the path to image2.jpg in your project directory
                    cid: 'longlogopng' // a unique CID for the second image
                }
            ]
            }
            details.push(travelerObject)
            details.push(hostObject)
        }

        if( emailType == "hostReview" ){
            //pull info from payload
            let hostName = payload.hostName
            let propertyName = payload.propertyName
            let bookingStart = payload.bookingStart
            let bookingEnd = payload.bookingEnd
            let reviewRating = payload.reviewRating
            let reviewComments = payload.reviewComments

            let emailSubject = "[WhereBnB] New Review Published"
            let reviewEmail = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Booking Notification for Host</title>
            </head>
            <body style="text-align: center; font-family: Arial, sans-serif; color: #333; display: flex; justify-content: center;  margin: 0; padding: 0; ">
                <div style="background-color: #fff; padding: 40px; box-sizing: border-box; max-width: 40%">
                    <div style="text-align: left;">
                        <img src="cid:longlogopng" alt="Logo" style="width: 120px;">
                        <!-- <img src="cid:longlogopng" alt=""> -->
                    </div>
                    <img src="cid:reviewpng" alt="Review Image" style="max-width: 60%; height: auto; margin: 30px 0;">
                    <!-- <img src="cid:reviewpng" alt=""> -->
                    <h1 style="color: #333; margin: 0 0 10px 0;">Hello ${hostName},</h1>
                    <p style="font-size: 24px; color: #333; margin: 0 0 30px 0;">a guest has left you a review!</p>
                    
                    <!-- Styled details of booking -->
                    <div style="text-align: left; padding: 40px;">
                        <h3>Review details:</h3>
                        <h3>${propertyName}</h3>
                        <table style="width: 100%;">
                            <tr>
                                <td style="text-align: left;">Guest Name:</td>
                                <td style="text-align: right;">${travelerName}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Dates:</td>
                                <td style="text-align: right;">${bookingStart} - ${bookingEnd}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Rating:</td>
                                <td style="text-align: right;">${reviewRating} <img src="cid:starpng" alt="" style="vertical-align: middle; height: 15px; margin-left: 5 px;"></td>
                                        <!-- <img src="cid:starpng" alt=""> -->
                            </tr>
                            <tr>
                                <td style="text-align: left; padding-top: 20px;">Comments:</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div style="background-color: #f2f2f2; border-radius: 8px; padding: 20px; margin-top: 10px;">
                                        ${reviewComments}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    
                    <div style="background-color: #f0f0f0; padding: 10px; text-align: center;">
                        <p style="font-size: 12px; color: #777;">This is an automated message. Please do not reply.</p>
                    </div>
                </div>
            </body>
            </html>
            `

            let reviewObject = {
                from: process.env.EMAIL_USERNAME,
                to: hostEmailRecipient,
                subject: emailSubject,
                html: reviewEmail,
                // images to be attached here
                attachments: [{
                    filename: 'review.png',
                    path: './assets/review.png', // the path to the image in your project directory
                    cid: 'reviewpng' // can be any unique string
                },
                {
                    filename: 'long-logo.png',
                    path: './assets/long-logo.png', // the path to image2.jpg in your project directory
                    cid: 'longlogopng' // a unique CID for the second image
                },
                {
                    filename: 'star.png',
                    path: './assets/star.png', // the path to image2.jpg in your project directory
                    cid: 'starpng' // a unique CID for the second image
                }
            ]
            }

            details.push(reviewObject)
        }

        if( emailType == "checkIn" ){
            let travelerEmailSubject = "[WhereBnB] Check In Instructions"
            let travelerEmailContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reservation Confirmation</title>
            </head>
            <body style="text-align: center; font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
                <div style="background-color: #fff; padding: 40px; box-sizing: border-box;">
                    <div style="text-align: left;">
                        <img src="cid:longlogopng" alt="Logo" style="width: 120px;">
                        <!-- <img src="cid:longlogopng" alt=""> -->
                    </div>
                    <img src="cid:checkinpng" alt="Checkin Image" style="max-width: 100%; height: 300px; margin: 30px 0;">
                    <!-- <img src="cid:checkinpng" alt=""> -->
                    <h1 style="color: #333; margin: 0 0 10px 0;">Welcome ${travelerName},</h1>
                    <p style="font-size: 24px; color: #333; margin: 0 0 30px 0;">here are you self check-in instructions!</p>

                    <!-- Unstyled details of booking -->
                    <div style="margin: 0; display: flex; justify-content: center; align-items: center;">
                        <div style="background-color: #f2f2f2; border-radius: 15px; max-width: 50%; padding: 40px; box-sizing: border-box; width: 100%; text-align: left;">
                            <h2>${propertyName}</h2>
                            <h3>${bookingStart} - ${bookingEnd}</h3>
                            
                            <p style="margin-top: 40px;"><b>Guest Instructions:</b></p>
                            <div style="background-color: #fff; border-radius: 8px; padding: 20px; margin-top: 20px;">
                                ${instructions} 
                            </div>
                            <p style="margin-top: 40px;"><b>We look forward to hosting you!</b></p>
                        </div>
                    </div>
                    
                </div>
                <div style="background-color: #f0f0f0; padding: 10px; text-align: center;">
                    <p style="font-size: 12px; color: #777;">This is an automated message. Please do not reply.</p>
                </div>
            </body>
            </html>
            `

            let hostEmailSubject = "[WhereBnB] Your Guests Have Checked In "
            let hostEmailContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Check-In</title>
            </head>
            <body style="text-align: center; font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
                <div style="background-color: #fff; padding: 40px; box-sizing: border-box;">
                    <div style="text-align: left;">
                        <img src="cid:longlogopng" alt="Logo" style="width: 120px;">
                        <!-- <img src="cid:longlogopng" alt=""> -->
                    </div>
                    <img src="cid:checkinpng" alt="Checkin Image" style="max-width: 100%; height: 300px; margin: 30px 0;">
                    <!-- <img src="cid:checkinpng" alt=""> -->
                    <h1 style="color: #333; margin: 0 0 10px 0;">Hey ${hostName},</h1>
                    <p style="font-size: 24px; color: #333; margin: 0 0 30px 0;">your guest has checked-in to their accommodation!</p>

                    <!-- Unstyled details of booking -->
                    <div style="margin: 0; display: flex; justify-content: center; align-items: center;">
                        <div style="background-color: #f2f2f2; border-radius: 15px; max-width: 50%; padding: 40px; box-sizing: border-box; width: 100%; text-align: left;">
                            <h2>${propertyName}</h2>
                            <h3>${bookingStart} - ${bookingEnd}</h3>
                            <h3>Guest name: ${travelerName}</h3>
                            
                            <p style="margin-top: 40px;"><b>Guest Instructions:</b></p>
                            <div style="background-color: #fff; border-radius: 8px; padding: 20px; margin-top: 20px;">
                                ${instructions} 
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div style="background-color: #f0f0f0; padding: 10px; text-align: center;">
                    <p style="font-size: 12px; color: #777;">This is an automated message. Please do not reply.</p>
                </div>
            </body>
            </html>
            `

            let travelerObject = {
                from: process.env.EMAIL_USERNAME,
                to: travelerEmailRecipient,
                subject: travelerEmailSubject,
                html: travelerEmailContent,
                // images to be attached here
                attachments: [{
                    filename: 'checkin.png',
                    path: './assets/checkin.png', // the path to the image in your project directory
                    cid: 'checkinpng' // can be any unique string
                },
                {
                    filename: 'long-logo.png',
                    path: './assets/long-logo.png', // the path to image2.jpg in your project directory
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
                    filename: 'checkin.png',
                    path: './assets/checkin.png', // the path to the image in your project directory
                    cid: 'checkinpng' // can be any unique string
                },
                {
                    filename: 'long-logo.png',
                    path: './assets/long-logo.png', // the path to image2.jpg in your project directory
                    cid: 'longlogopng' // a unique CID for the second image
                }
            ]
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

