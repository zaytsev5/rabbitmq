const amqp = require('amqplib')
const mongoose = require('mongoose')
const db = require('./model/config/key').mongoURI
const Client = require('./model/user.model')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const PUBLISH = 'ADD'
const CONSUME = 'RETURN'

var channel, connection
var response

connect()
mongoose
.connect(
  db,
  { useNewUrlParser:true,useUnifiedTopology: true},

  )
  .then(() =>{
	  console.log('[⚡️] - MongoDB Connected')
	}
  )
  .catch(err => console.log(err));

async function connect(){
       try {
         connection = await amqp.connect("amqp://localhost:5672")
         channel = await connection.createChannel()
         await channel.assertQueue(CONSUME)
              
    } catch (e) {
        console.log(e.message);
    }



}
app.get('/users',(req, res) => {
	Client.find().then(users => res.status(200).json(users)).catch(e => res.status(403).json({error: e.message}))
})

app.post('/user/add', (req, res) => {
//	const new_client = new Client(req.body)
	
	channel.sendToQueue(
		PUBLISH,
		Buffer.from(
			JSON.stringify(req.body)
		)
	)
	channel.consume(CONSUME, (data) =>{
		response  = JSON.parse(data.content.toString())
		channel.ack(data)
		// console.log(response)
		
	})
	return res.status(200).send(response)
})



app.listen(port, () => console.log(` user service is running on port ${port} `))
