import amqp from 'amqplib';
import { notifController } from '../controller/notif.controller.js';
import dotenv from 'dotenv'

dotenv.config()


let jsonMsg = null

export function parseMessage(msg){
    console.log("parsing message")
    jsonMsg = JSON.parse(msg.content)
    return jsonMsg
}

export async function startConsumer() {

    console.log("consumer started")
    console.log("connecting to rabbitmq...")

    console.log('host:', process.env.RABBIT_HOST)
    console.log('port:', process.env.RABBIT_PORT)

    try {
        const conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);

        console.log("connected to rabbitmq")
        console.log("creating channel...")

        const channel = await conn.createChannel();

        console.log("channel created")
        let queueName = "notifQueue"

        await channel.assertQueue(queueName, {durable: true});
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