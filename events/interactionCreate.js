const fs = require('fs');
const { Client, Collection } = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;
const client = new Client({ intents: 131071 });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	client.commands.set(command.data.name, command);
}

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if(interaction.inGuild()) {
			console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
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
		} else {
			interaction.reply('Commands Only Worked in Servers');
		}
    },
};