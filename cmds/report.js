const { RichEmbed } = require("discord.js");
const Discord = require('discord.js')
const { stripIndents } = require("common-tags");

module.exports = {
  name: "report",
  category: "moderation",
  description: "Reports a member",
  usage: "<mention, id>",
  run: async (client, message, args) => {
    if (message.deletable) message.delete();

    var kont = new RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("Missing Arguments!")
      .setDescription("Usage: `a.report [text]`")
      .setTimestamp();

    if (!args[0]) return message.channel.send(kont).then(m => m.delete(5000));

    const channel = client.channels.get('711704287004328056')

    if (!channel)
      return message.channel
        .send("Couldn't find a `#reports` channel")
        .then(m => m.delete(5000));

    const test = new RichEmbed()
      .setColor("RANDOM")
      .setTitle("Report Anda telah diisi oleh tim staf. Terima kasih!");
    message.channel.send(test).then(m => m.delete(5000));

    const embed = new RichEmbed()
      .setColor("#ff0000")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL)
      .setAuthor("New Report", message.author.displayAvatarURL)
      .setDescription(`**- Reported by:** ${message.author.tag}
**- Reported in:** ${message.guild.name}
**- Reason:** ${args.slice(0).join(" ")}`);
    const msg = await channel.send(embed)
    }  
};
