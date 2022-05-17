const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Show Avatar')
		.addUserOption(option => option.setName('user').setDescription('Input User')),
	async execute(interaction) {
		const guildUser = interaction.options.getMember('user') || interaction.member; 
		const normalUser = interaction.options.getUser('user') || interaction.user;

		const highestRoleColor = guildUser.roles.highest.color;
		const serverProfileURL = guildUser.avatarURL({format: 'png', dynamic: true, size: 512});
		const userProfileURL = normalUser.avatarURL({format: 'png', dynamic: true, size: 512});
		// console.log(normalUser.avatarURL({format: 'png', size: 512}))
		const serverEmbed = new MessageEmbed({
			title: "Server Avatar",
			color: highestRoleColor,
			author: {
				name: `${guildUser.user.tag}`,
				icon_url: serverProfileURL,
			},
			image: {
				url: serverProfileURL,
			}
		})
		const userEmbed = new MessageEmbed(serverEmbed).setTitle('User Avatar').setImage(userProfileURL).setAuthor({name: `${guildUser.user.tag}`, iconURL: userProfileURL});
		
		if(serverProfileURL) {
			await interaction.reply({
				"embeds": [
				  serverEmbed, userEmbed
				],
		  });
		} else {
			await interaction.reply({
				"embeds": [
				  userEmbed
				],
		  });
		}
	},
};