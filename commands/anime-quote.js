const { SlashCommandBuilder, quote } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime-quote')
		.setDescription('Show Anime Quote'),
	async execute(interaction) {
		const url = "https://animechan.vercel.app/api/random";
        var data = require('../api/quoteJSON');
        const dataJSON = await data(url);


		await interaction.reply(`${dataJSON.quote} - **${dataJSON.character}** (*${dataJSON.anime}*)`);
	},
};

