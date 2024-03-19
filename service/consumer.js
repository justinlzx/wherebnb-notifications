import amqp from 'amqplib';



let jsonMsg = null

export function parseMessage(msg){
    jsonMsg = JSON.parse(msg.content)
    return jsonMsg
}

export async function startConsumer(callback) {

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
            callback(jsonMsg);
        });
    } catch (err) {
        console.error(err);
    }
}

// export { msgContent }