const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = process.env.PORT || 8080;

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.listen(port, () => {
	console.log(`🚀🌎 Server is running at http://localhost:${port} 🚀`);
});

server.get('/', (req, res) => {
	try {
		res.status(200).send('Api is running');
	} catch (err) {
		next(err);
	}
});

server.all('*', (req, res) => {
	res.status(404).json({ message: "The URL you are looking for can't be found" });
});
