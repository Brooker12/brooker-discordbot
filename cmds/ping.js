const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const m = await message.channel.send("Ping?");
  const ping = new Discord.RichEmbed()
    .setColor("#c94f4f")
    .setTitle(":ping_pong: Pong!")
    .addField(
      `**Latency**`,
      `${m.createdTimestamp - message.createdTimestamp}ms.`
    )
    .addField(`**API Latency**`, `${Math.round(client.ping)}ms`);
  m.edit(ping);
};

module.exports.help = {
    name: "ping",
    description: "show your ping",
    category: "Information",
    usage: "`a.ping`"
}