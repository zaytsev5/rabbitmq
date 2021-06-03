const amqp = require('amqplib')


var channel, connection

const PUBLISH = 'ADD'
const CONSUME = 'RETURN'

async function connect(){
    const msg = {number: 23}
    try {
         connection = await amqp.connect("amqp://localhost:5672")
         channel = await connection.createChannel()
         channel.assertQueue(PUBLISH)
        
         console.log("waiting for messages...");
      
    } catch (e) {
        console.log(e.message);
    }
} 

connect().then(() =>{
	channel.consume(PUBLISH,( data) => {
		const input = JSON.parse(data.content.toString())
		console.log('Data ', input)
		console.log('Got USER  service')
		//do some stuff like insert data to database
		channel.ack(data)

	channel.sendToQueue(
		CONSUME,
		Buffer.from(
			JSON.stringify({
				msg : 'added OK'
			})
		)
	)
   })
})
