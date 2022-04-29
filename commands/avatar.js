const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Show Avatar')
		.addUserOption(option => option.setName('user').setDescription('Enter User').setRequired(true)),
	async execute(interaction) {
		const guildUser = interaction.options.getMember('user'); 
		const highestRoleColor = interaction.options.getMember('user').roles.highest.color;
		const imageURL = guildUser.avatarURL({dynamic: true, size: 512}) || interaction.options.getUser('user').avatarURL({dynamic: true, size: 512});
		await interaction.reply({
  			"embeds": [
  			  {
				"title": "Avatar",
  			    "color": highestRoleColor,
  			    "author": {
  			      "name": `${guildUser.user.tag}`
  			    },
				"image": {
					"url": imageURL,
				}
  			  }
  			],
		});
	},
};