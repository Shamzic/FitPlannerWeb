const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	firstname: String,
	username: String
	birthDate: Date
	mail: String
	city:String
	weight: Number
	height: Number
	//friends list
	password: String
});

module.exports = mongoose.model('User', userSchema)