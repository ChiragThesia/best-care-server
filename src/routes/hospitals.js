const router = require('express').Router();
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
