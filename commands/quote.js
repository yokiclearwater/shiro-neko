const { SlashCommandBuilder, quote } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Show Random Quote'),
	async execute(interaction) {
		const url = "https://api.quotable.io/random";
        var data = require('../api/quoteJSON');
        const dataJSON = await data(url);


		await interaction.reply(`${dataJSON.content} - **${dataJSON.author}**`);
	},
};

