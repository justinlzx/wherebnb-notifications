import amqp from 'amqplib';
import { notifController } from '../controller/notif.controller.js';


let jsonMsg = null

export function parseMessage(msg){
    console.log("parsing message")
    jsonMsg = JSON.parse(msg.content)
    return jsonMsg
}

export function getLatestMessage() {
    return jsonMsg;
}

export async function startConsumer() {

    console.log("consumer started")
    console.log("connecting to rabbitmq...")

    try {
        const conn = await amqp.connect('amqp://localhost');

        console.log("connected to rabbitmq")
        console.log("creating channel...")

        const channel = await conn.createChannel();

        console.log("channel created")
        let queueName = "notifQueue"

        await channel.assertQueue(queueName, {durable: false});
        channel.consume(queueName, (msg) => {
            console.log(" [x] Received %s", msg.content);
            channel.ack(msg);
            jsonMsg = parseMessage(msg);

        // Create mock req and res objects
        const req = { body: jsonMsg };
        const res = {
            status: function() { return this; },  // Return this for chaining
            json: function(err) { console.error(err); }
        };


        // Call the controller function 
        notifController(req, res);
        });
    } catch (err) {
        console.error(err);
    }
}

// export { msgContent }