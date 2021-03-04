const router = require('express').Router();
const Hospital = require('../models/hospital');
const axios = require('axios');

router.get('/', (req, res) => {
	try {
		const responseObj = {
			message: 'Hospital lists can be found at http://localhost:8080/hospital/hospitalList',
			Source: 'data.cms.gov'
		};
		res.status(200).json(responseObj);
	} catch (error) {
		res.status(400).json(error.message);
	}
});

router.get('/allHospitals/:state', (req, res) => {
	try {
		Hospital.find({ state: req.params.state }, function(err, result) {
			if (err) {
				res.json(err);
			}
			else {
				res.status(200).json(result);
			}
		});
	} catch (error) {
		res.status(400).json({ message: 'No hospitals found' });
	}
});

router.get('/list', async (req, res) => {
	try {
		const uri =
			'https://data.cms.gov/provider-data/api/1/datastore/sql?query=[SELECT * FROM 9af2a351-ba4e-5af4-b0e7-542e4bbd1af4][OFFSET 3115];&sho_db_columns=true';
		const api_url = encodeURI(uri);
		await axios
			.get(api_url)
			.then((res) => {
				const data = res.data;
				data.forEach((hospital) => {
					const newHospital = new Hospital({
						hospitalName: hospital['Facility Name'],
						state: hospital.State,
						MRSA_W_Z_Score: hospital['MRSA W Z Score'],
						paymentReduction: hospital['Payment Reduction']
					});
					newHospital.save();
				});
			})
			.catch((error) => {
				console.log(error.message);
			});
		res.status(200).json({
			message:
				'new Hospitals were saved, please use the /allHospitals/:state endpoint to get hospital for a specific  state'
		});
	} catch (error) {
		res.status(400).json(error.message);
	}
});
module.exports = router;
