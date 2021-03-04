//Default Imports
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;

//server instance
const server = express();

//router imports
const hospitalRouter = require('./src/routes/hospitals');

//middleware usages
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

const mongoURI = process.env.DB_CONNECTION;

server.get('/', (req, res) => {
	try {
		res.status(200).send('Api is running');
	} catch (err) {
		next(err);
	}
});

//Hospital router
server.use('/hospital', hospitalRouter);

server.listen(port, () => {
	console.log(`🚀🌎 Server is running at http://localhost:${port} 🚀`);
});

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => {
		console.log('MongoDB Connected....!!!');
	})
	.catch((error) => {
		console.log(error);
	});

server.all('*', (req, res) => {
	res.status(404).json({ message: "The URL you are looking for can't be found" });
});
