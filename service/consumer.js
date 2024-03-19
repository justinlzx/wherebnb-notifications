import amqp from 'amqplib';


let msgContent = null

export function getJsonMsg(msg){
    jsonMsg = JSON.parse(msg.content)
    return jsonMsg
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
            getJsonMsg(msg)
            
            console.log(" [x] Received %s", msg.content);
            channel.ack(msg);
            
        });
    } catch (err) {
        console.error(err);
    }
}

export { msgContent }