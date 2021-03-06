const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banner')
		.setDescription('Show Banner')
		.addUserOption(option => option.setName('user').setDescription('Input User')),
	async execute(interaction) {
        const guildUser = interaction.options.getMember('user') || interaction.member;
		const normalUser = interaction.options.getUser('user') || interaction.user;

        const fetchUser = await normalUser.fetch(true);
        const userProfileURL = fetchUser.bannerURL({format: 'png', dynamic: true, size: 1024})

		const displayUserColor = guildUser.displayColor;
        
        if(userProfileURL) {
            const serverEmbed = new MessageEmbed({
                title: "User Banner",
                color: displayUserColor,
                author: {
                    name: `${guildUser.user.tag}`,
                    icon_url: `${normalUser.avatarURL({dynamic: true})}`,
                },
                image: {
                    url: userProfileURL,
                }
            });
        
            await interaction.reply({
                "embeds": [
                  serverEmbed
                ],
            });
        } else {
            await interaction.reply(`${guildUser} has no banner!!`);
        }
	},
};