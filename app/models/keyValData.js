var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DataSchema = new Schema({
	key: {
 		type: String, required: true ,trim:true
	},
  value: {
 		type: String, required: true
	},
	createdAt : {
		type : Date, required : true, default : Date.now
	}
});

module.exports = mongoose.model('Data', DataSchema);