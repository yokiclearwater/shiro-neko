const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription(`Show Server's Info`),
    async execute(interaction) {
        const guild = interaction.guild;  
        const guildOwner = await guild.fetchOwner({caches: true, force: true});
        const guildChannels = await guild.channels.fetch();
        const voiceChannelsCount = guildChannels.filter((c) => c.type === 'GUILD_VOICE').size;
        const textChannelsCount = guildChannels.filter((c) => c.type === 'GUILD_TEXT').size;
        const categoryChannelsCount = guildChannels.filter((c) => c.type === 'GUILD_CATEGORY').size;
        const guildCreation = `${guild.createdTimestamp}`.slice(0, 10);
        const serverEmbed = new MessageEmbed({
                color: null,
                fields: [
                  {
                    name: 'Owner',
                    value: `${guildOwner.user.tag}`,
                  },
                  {
                    name: 'Category Channels',
                    value: `${categoryChannelsCount}`,
                  },
                  {
                    name: 'Text Channels',
                    value: `${textChannelsCount}`,
                  },
                  {
                    name: 'Voice Channels',
                    value: `${voiceChannelsCount}`,
                  },
                  {
                    name: 'Members',
                    value: `${guild.memberCount}`,
                  },
                  {
                    name: 'Roles',
                    value: `${guild.roles.cache.size}`,
                  },
                  {
                    name: 'Server Created',
                    value: `<t:${guildCreation}:F>`,
                  },
                  {
                    name: 'Emotes',
                    value: `${guild.emojis.cache.size}`,
                  }
                ],
                author: {
                  name: `${guild.name}`,
                  icon_url: `${guild.iconURL({dynamic: true})}`
                },
                thumbnail: {
                  url: `${guild.iconURL({dynamic: true})}`
                }
            })
        const guildBanner = guild.bannerURL({format: 'png', size: 1024});
        if(guildBanner) {
            serverEmbed.setImage(guildBanner);
        }
        
        await interaction.reply({
            "embeds": [
              serverEmbed
            ],
        });

    }
}