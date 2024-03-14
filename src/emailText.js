

//there are 5 different email text types
// 1. Traveler gets confirmation message with details of stay
// 2. Host gets notified that their property has been booked
// 3. Host gets notified that new review has been published about their property
// 4. email of check in details triggered
// 5. Host gets notified that guest has checked in 


export function getBookingConfirmation(details) {
    return `Dear ${details.travelerName},

Thank you for booking your stay at ${details.propertyName} from ${details.startDate} to ${details.endDate}.

We look forward to hosting you!

Best,
Your Booking Team`;
}

export function getHostNotification(details) {
    return `Dear ${details.hostName},

Your property, ${details.propertyName}, has been booked from ${details.startDate} to ${details.endDate}.

Best,
Your Booking Team`;
}

export function getReviewNotification(details) {
    return `Dear ${details.hostName},

A new review has been published about your property, ${details.propertyName}.

Best,
Your Booking Team`;
}

export function getCheckInDetails(details) {
    return `Dear ${details.travelerName},

Here are your check-in details for your stay at ${details.propertyName} from ${details.startDate} to ${details.endDate}.

Best,
Your Booking Team`;
}

export function getCheckInNotification(details) {
    return `Dear ${details.hostName},

Your guest, ${details.travelerName}, has checked in to your property, ${details.propertyName}.

Best,
Your Booking Team`;
}