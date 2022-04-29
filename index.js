const fs = require('node:fs');
const { Client, Collection } = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;

const client = new Client({ intents: 131071 });

client.once('ready', () => {
	console.log(`${client.user.username} is Ready!!!`);
	require('./global');
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	
	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);