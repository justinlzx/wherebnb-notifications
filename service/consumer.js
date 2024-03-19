import amqp from 'amqplib';


let msgContent = null

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
            msgContent = msg.content.toString()
            console.log(" [x] Received %s", msg.content.toString());
            channel.ack(msg);
            
        });
    } catch (err) {
        console.error(err);
    }
}

export { msgContent }