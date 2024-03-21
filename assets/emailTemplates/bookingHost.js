export const bookingHostTemplate = `
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
                    <td style="text-align: right;">${bookingDates}</td>
                </tr>
                <tr>
                    <td style="text-align: left;">Total Price:</td>
                    <td style="text-align: right;">${totalPrice}</td>
                </tr>
            </table>
            <p style="margin-top: 60px;"><b>Guest Instructions:</b> ${instructions}</p>
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