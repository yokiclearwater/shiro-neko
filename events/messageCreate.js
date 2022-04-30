const { client } = require("../index");
const {MessageAttachment} = require('discord.js')


const slurs = ["nigga", "nigger"];

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message) {
		if(message.author.bot) return;

        // slurs.forEach(async (word) => {
        //     if(message.content.toLowerCase().includes(word)) {
        //         await timeout(2500)
        //         message.reply("You're fucking racist");
        //     }
        // })

        const attachment = new MessageAttachment('https://media.discordapp.net/attachments/960927762691022949/969660968818864128/stsmall507x507-pad600x600f8f8f8.jpg');
        if(message.mentions.has(client.user)) {
            await timeout(1500);
            message.reply({
                content: `${message.author}${message.author}${message.author}, Uno Reverse`,
                files: [attachment]
            });
        }
	},
};

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
