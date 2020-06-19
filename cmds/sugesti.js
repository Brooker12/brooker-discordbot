const { RichEmbed } = require("discord.js");
const Discord = require ("discord.js")

module.exports = {
    name: "suggest",
  category: "main",
  usage: "<message>",
    description: "suggest anything you wanted to",
    run: async (bot, message, args) => {
    message.delete()
    // reasoning definition
    let xdemb = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.sugesti [saran]`")
    .setTimestamp();
    let suggestion = args.join(" ");
    if (!suggestion)
      return message.channel
        .send(xdemb)
        .then(m => m.delete(5000));

    // grab reports channel
      let sChannel = message.guild.channels.get("675710819819847710");
      if(!sChannel) return message.channel.send("Anda tidak memiliki saluran dengan nama `suggestions`")
    // send to reports channel and add tick or cross
    var test = new Discord.RichEmbed() 
        .setColor("RANDOM")
        .setTitle('Saran Anda telah diisi oleh tim staf. Terima kasih!');
      message.channel 
      .send(test)
      .then(m => m.delete(15000));
    let suggestembed = new RichEmbed()
      .setTitle("Sugestions")
      .setFooter(bot.user.username, bot.user.displayAvatarURL)
      .setTimestamp()
      .setDescription(`**- Saran dari:** ${message.author.tag}
**- Saran:** ${suggestion}`)
      .setColor('#ff2052');
    sChannel.send(suggestembed).then(async msg => {
      await msg.react("✅");
      await msg.react("❌");
    });
  }
};
 