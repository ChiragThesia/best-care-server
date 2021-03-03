const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
	hospitalName: {
		type: String
	},

	state: {
		type: String,
		index: true
	},

	MRSA_W_Z_Score: {
		type: String
	},

	paymentReduction: {
		type: String
	}
});

const Hospital = mongoose.model('Hospital', HospitalSchema);
module.exports = Hospital;
