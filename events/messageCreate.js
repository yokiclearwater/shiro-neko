const { client } = require("../index");
const {MessageAttachment} = require('discord.js')
var myInterval;

const slurs = ["nigga", "nigger"];

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message) {
		if(message.author.bot) return;

        const attachment = new MessageAttachment('https://media.discordapp.net/attachments/960927762691022949/969660968818864128/stsmall507x507-pad600x600f8f8f8.jpg');
        if(message.mentions.has(client.user)) {
            await timeout(1500);
            message.reply({
                content: `${message.author}${message.author}${message.author}, Uno Reverse`,
                files: [attachment]
            });
        }

        const clientInfo = await client.application.fetch();
        if(message.content.startsWith("$annoy") && (message.author.id === clientInfo.owner.id)) {
            const firstMention = message.mentions.users.first();
            message.delete()
            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
            .catch(console.error);
            var messageFunction = () => {
                if(message.mentions.users.first()) {
                    message.channel.send(`<@${firstMention.id}>`).then(msg => msg.delete());
                } else {
                    message.channel.send('<@781254456855494676>').then(msg => msg.delete());
                }
            }
            messageFunction()
            myInterval = setInterval(messageFunction, 10000);
        }

        if(message.content === "$stop" && (message.author.id === clientInfo.owner.id)) {
            clearInterval(myInterval);
        }
	},
};

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
