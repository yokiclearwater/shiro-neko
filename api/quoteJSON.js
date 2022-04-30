
const fetch = require('node-fetch');

module.exports = async function(url) {
	const response = await fetch(url);
	
	var data = await response.json();
	return data;
}


