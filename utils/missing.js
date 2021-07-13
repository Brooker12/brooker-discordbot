const discord = require("discord.js");
const db = require("quick.db");

class Util {
  static getArgs(message, client, db) {
    let prefix = db.fetch(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = "a.";
    let cmd = message.content.split(prefix)[1].split(" ")[0];

    let command =
      client.commands.get(`${cmd}`) ||
      client.commands.get(client.aliases.get(`${cmd}`));

    let Args = new discord.MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
      .setDescription(`Usage: ${command.usage || "[ None ]"}`);

    return message.channel.send(Args);
  }

  static getMention(message) {
    let Mention = new discord.MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
      .setDescription(`You must mentions member first`);

    return message.channel.send(Mention);
  }

  static getInvalid(message) {
    let Invalid = new discord.MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
      .setDescription(`Invalid Argument`);

    return message.channel.send(Invalid);
  }
}

module.exports = Util;
