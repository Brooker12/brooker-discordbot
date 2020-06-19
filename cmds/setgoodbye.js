const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setwelcome",
  category: "moderation",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: (client, message, args) => {
    var p = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
      .setColor("#ffffff")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("Insufficient Permissions!")
      .setDescription(
        "You need the `Administator` permission to use this command!"
      )
      .setTimestamp();
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(p);

    if (args[0] === "off") return message.channel.send("setjoin has been off");

    let channel = message.mentions.channels.first(); //mentioned channel

    if (!channel) {
      //if channel is not mentioned
      return message.channel.send("Please mention a channel");
    }

    //Now we gonna use quick.db

    db.set(`levchannel_${message.guild.id}`, channel.id); //set id in var
let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: GoodBye Message")
    .setDescription(`**GoodBye** has been seted in **${channel}**`)
    .setColor("#ff2050")
    .setFooter(`Modearator ${message.author.username}`);
   message.channel.send(embed1).then(m => m.delete(10000));
  }
};

module.exports.help = {
    name: "setgoodbye",
    description: "set channel goodbye message",
    category: "Moderator",
    usage: "`setgoodbye <#channel>`"
}