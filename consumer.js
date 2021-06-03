const amqp = require('amqplib')

connect()
async function connect(){
    const msg = {number: 23}
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const result = await channel.assertQueue("jobs")
        
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString())
            console.log(`Recieved job with input ${ input.number}`);
        })

        console.log("waiting for messages...");
        
    } catch (e) {
        console.log(e.message);
    }
} 