const { SlashCommandBuilder, quote } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Show Random Quote'),
	async execute(interaction) {
        var data = require('../api/quoteJSON');
        const dataJSON = await data();


		await interaction.reply(`${dataJSON.content} - **${dataJSON.author}**`);
	},
};

