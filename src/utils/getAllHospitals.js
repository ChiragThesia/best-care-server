const axios = require('axios');
const Hospital = require('../models/hospital');

async function getAllHospitals() {
	const uri =
		'https://data.cms.gov/provider-data/api/1/datastore/sql?query=[SELECT * FROM 9af2a351-ba4e-5af4-b0e7-542e4bbd1af4]';
	const api_URL = encodeURI(uri);
	const totalData = 5;

	while (totalData > 1) {
		await axios
			.get(api_URL)
			.then((res) => {
				const newHospital = new Hospital({
					hospitalName: res.data['Facility Name'],
					state: res.data.state,
					MRSA_W_Z_Score: res.data['MRSA W Z Score'],
					paymentReduction: res.data['Payment Reduction']
				});
				newHospital.save();
				totalData -= 1;
			})
			.catch((error) => {
				console.log(error);
			});
	}
}

module.exports = getAllHospitals;
