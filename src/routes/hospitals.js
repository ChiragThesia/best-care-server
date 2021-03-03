const router = require('express').Router();
const axios = require('axios');
const Hospital = require('../models/hospital');

router.get('/', (req, res) => {
	try {
		console.log('Inside hospital Router');
		const responseObj = {
			message: 'Hospital lists can be found at http://localhost:8080/hospital/hospitalList',
			Source: 'data.cms.gov'
		};
		res.status(200).json(responseObj);
	} catch (error) {
		res.status(400).json(error.message);
	}
});

// router.get('/list', async (req, res) => {
// 	try {
// 		const { abrState } = req.body;
// 		const uri =
// 			'https://data.cms.gov/provider-data/api/1/datastore/sql?query=[SELECT * FROM 9af2a351-ba4e-5af4-b0e7-542e4bbd1af4][LIMIT 500 OFFSET 3116];&sho_db_columns=true';
// 		const api_url = encodeURI(uri);
// 		await axios
// 			.get(api_url)
// 			.then((res) => {
// 				const data = res.data;
// 				data.forEach((hospital) => {
// 					const newHospital = new Hospital({
// 						hospitalName: hospital['Facility Name'],
// 						state: hospital.State,
// 						MRSA_W_Z_Score: hospital['MRSA W Z Score'],
// 						paymentReduction: hospital['Payment Reduction']
// 					});
// 					newHospital.save();
// 				});
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 		res.status(200).json(response.data);
// 	} catch (error) {
// 		res.status(400).json(error);
// 	}
// });

router.get('/allHospitals/:state', (req, res) => {
	try {
		Hospital.find({ state: req.params.state }, function(err, result) {
			if (err) {
				console.log(err);
				res.json(err);
			}
			else {
				console.log('results', result);
				res.status(200).json(result);
			}
		});
	} catch (error) {
		res.status(400).json({ message: 'No hospitals found' });
	}
});

module.exports = router;
