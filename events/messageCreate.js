const { client } = require("../index");
const {MessageAttachment} = require('discord.js')
var myInterval;

const slurs = ["nigga", "nigger"];

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message) {
		if(message.author.bot) return;

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
