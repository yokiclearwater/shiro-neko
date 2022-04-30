
const fetch = require('node-fetch');

module.exports = async function() {
	const url = "https://api.quotable.io/random";

	const response = await fetch(url);
	
	var data = await response.json();
	return data;
}


