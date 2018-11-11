const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
	name: String,
	genre: String,
	numberOfUsers: Number,
	//muscleId: String
});

module.exports = mongoose.model('User', userSchema)
