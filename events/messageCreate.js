const { client } = require("../index");
const {MessageAttachment} = require('discord.js')
var myInterval;

const randomColor = require('randomcolor');

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message) {
		if(message.author.bot) return;

        const clientInfo = await client.application.fetch();
        
        if(message.content.startsWith("$role_random ") && (message.author.id === clientInfo.owner.id)) {
            var randomRoleColor = () => {
                let role = message.mentions.roles.first() || message.content.substr("$role_random ".length);
                var color = randomColor();
                message.guild.roles.edit(role, {color: color}).then(updated => console.log(`Edited role name to ${updated.color}`))
            .catch(console.error);;
            console.log(color);
            }
            randomRoleColor();
            const minute = 60 * 1000;
            myInterval = setInterval(randomRoleColor, 10 * minute); 
        }

        // if(message.content.startsWith("$annoy") && (message.author.id === clientInfo.owner.id)) {
        //     const firstMention = message.mentions.users.first();
        //     message.delete()
        //     .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        //     .catch(console.error);
        //     var messageFunction = () => {
        //         if(message.mentions.users.first()) {
        //             message.channel.send(`<@${firstMention.id}>`).then(msg => msg.delete());
        //         } else {
        //             message.channel.send('<@781254456855494676>').then(msg => msg.delete());
        //         }
        //     }
        //     messageFunction()
        //     myInterval = setInterval(messageFunction, 10000);
        // }

        if(message.content === "$stop" && (message.author.id === clientInfo.owner.id)) {
            clearInterval(myInterval);
        }
	},
};

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
