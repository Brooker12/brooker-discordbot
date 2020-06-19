const Discord = require("discord.js");

exports.run = async (client, message, args, level, bot) => {
  try {
    let ch = message.guild.channels.get("693128532598980688");
    var missingPermissionsEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("Insufficient Permissions!")
      .setDescription(
        "You need the `MANAGE_MESSAGES` permission to use this command!"
      )
      .setTimestamp();
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel
        .send(missingPermissionsEmbed)
        .then(m => m.delete(5000));
    var q = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
      .setColor("RANDOM")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("Missing Arguments!")
      .setDescription("Usage: `a.addch [channel/voice/category] [name]`")
      .setTimestamp();

    if (!args[1]) return message.channel.send(q);
    if (!args[0]) return message.channel.send(q);
    message.guild.createChannel(args[1], args[0], []).catch(err => {
      message.channel.send("There was an error!");
    });
    const channel = message.guild.channels.find(channel => channel.name === args[1]);
     let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Create Channel")
    .setDescription(`**Succesfully Create ${args[0]} ${args[1]}**`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1).then(m => m.delete(10000));
    // var warningEmbed = new Discord.RichEmbed()
    //     .setFooter(message.author.username, message.author.avatarURL)
    //     .setColor("#25c059")
    //     .setTitle(`Create Channel`)
    //     .addField('Moderator', message.author, true)
    //     .addField('Channel', args[1])
    //     .setTimestamp();
    //   ch.send(warningEmbed)
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["crc", "chanmake"],
  guildOnly: true,
  permLevel: "Administrator"
};

exports.help = {
  name: "createchl",
  category: "Moderation",
  description: "Creates a channel in the server.",
  usage: "`createchl <voice/text> <name>`"
};
