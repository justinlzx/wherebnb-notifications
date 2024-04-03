# wherebnb-notifications

wherebnb-notifications is a service that consumes messages from RabbitMQ and sends notification emails 

## Prerequisites

- Docker
- RabbitMQ server

## Getting Started
1. Clone the repository


2. Create a `.env` file in the root directory

  ```sh
    EMAIL_USERNAME = email.address
    EMAIL_PASSWORD = email.app.password

    RABBIT_HOST = localhost
    RABBIT_PORT = 5672
  ```

3. (a) Build and run the Docker container: 

    ```sh
    docker build -t wherebnb-notifications .
    docker run wherebnb-notifications
    ```
3. (b) Run app on development server

  ```sh
    npm run dev
  ```
## How It Works

The microservice connects to RabbitMQ server and starts consuming messages from "notifQueue" queue. Each message should be a JSON object with the following structure:

```json
{
    "emailType": "checkIn",
    "travelerEmail": "travelerEmail",
    "travelerName": "travelerName",
    "hostEmail": "hostEmail",
    "hostName": "hostName",
    "bookingStart": "bookingStart",
    "bookingEnd": "bookingEnd",
    "totalPrice": "totalPrice",
    "country": "country",
    "instructions": "instructions",
    "propertyName": "propertyName",
    "reviewRating": "reviewRating",
    "reviewComments": "reviewComments"

}
```


