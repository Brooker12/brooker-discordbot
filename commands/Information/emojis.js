const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "emojis",
    category: "Information",
    description: "Show Emoji Information!",
    usage: "`emojis <Emoji>`",
    aliases: [""], 
    cooldown: 2000,
    run: async (client, message, args) => {
      
        let wrong = new MessageEmbed().setColor('#2f3136') 
        .setAuthor("Missing Arguments!", message.author.displayAvatarURL())
        .setDescription(`Invalid Argument or this emojis has default!`)

        if (!args[0] || !args[0].startsWith("<") || !args[0].endsWith(">") || !args[0].includes(":")) 
        return message.channel.send(wrong);

        let Thinger = args[0].split(":");

        let Animated;
        if (Thinger[0] === "<a") {
          Animated = true;
        } else {
          Animated = false;
        };

        const Name = Thinger[1];
        const ID = Thinger[2].slice(0, -1);
        const Link = `https://cdn.discordapp.com/emojis/${ID}.${Animated ? "gif" : "png"}?v=1`;

        const Embed = new MessageEmbed().setColor(client.config.color)
        .setAuthor(Name, Link)
        .setImage(Link)
        return message.channel.send(Embed);
    }
}