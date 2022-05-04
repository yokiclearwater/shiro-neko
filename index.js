// const express = require("express");
// const app = express();

// app.get('/', (req, res) => {
//   res.send('I am online')
// });

// app.listen(3000, () => {
//   console.log('Connected To Server')
// })

const fs = require('fs');
const { Client, Collection } = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;
const client = new Client({ intents: 131071 });

module.exports.client = client;

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);