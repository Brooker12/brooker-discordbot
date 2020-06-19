const { RichEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
        // Get a member from mention, id, or username
        let person = message.mentions.users.first();

        if (!person) return message.channel.send('mention babyk')

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new RichEmbed()
            .setColor("#ffb6c1")
            .addField(`☁ **${person.username}** loves **${message.author.username}** this much:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);
        message.channel.send(embed);
    }
module.exports.help = {
    name: "love",
    description: "show love percentage",
    category: "Fun",
    usage: "`love <@user>`"
}