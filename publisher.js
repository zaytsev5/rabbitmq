const amqp = require('amqplib')

connect()
async function connect(){
    const msg = {number: process.argv[2]}
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const result = await channel.assertQueue("jobs")
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
        console.log(`Job sent successfully ${msg.number}`);
        
    } catch (e) {
        console.log(e.message);
    }
}
