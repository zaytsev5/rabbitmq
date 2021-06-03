const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
	name:{
		type: String,
		required:true

	},
	email:{
		type: String,
		required:true,
	},
	password:{
		type: String,
		required: true,

	},
	role:{
		type: String,
		required: true,
	},
	date:{
		type: Date,
		default: new Date(),
	},
	avt:{
		type: String,
		default : 'https://cdn0.iconfinder.com/data/icons/education-flat-7/128/17_Scholl_Bus-512.png'
	}

})

const Client = mongoose.model('Client', ClientSchema)

module.exports = Client;
