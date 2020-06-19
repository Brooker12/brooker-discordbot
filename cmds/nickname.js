const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
  let ch = message.guild.channels.get("693128532598980688");
  var ajg = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `Manage Nicknames` permission to use this command!"
    )
    .setTimestamp();
  if (!message.member.hasPermission("MANAGE_NICKNAMES"))
    return message.channel.send(ajg);
  var m = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.nickname [@User] [newname]`")
    .setTimestamp();
  if (message.mentions.users.size < 1) return message.channel.send(m);
  let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position)
    return message.reply(
      "I cant change that members nickname. They are the same level as you or higher."
    );
  let newusername = args.slice(1).join(" ");
  if (newusername.length < 1) return message.reply(m);
  message.guild.members.get(user.user.id).setNickname(newusername);
   let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Nickname")
    .setDescription(`**Succesfully change nickname ${message.mentions.users.first().tag}**`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1).then(m => m.delete(10000));
  message.delete()
  //     const embed = new Discord.RichEmbed()
  //  .setAuthor('[setNick] ' + message.mentions.users.first().tag, message.mentions.users.first().avatarURL)
  //  .setFooter(message.author.username, message.author.avatarURL)
  //  .addField('User', user, true)
  //  .addField('Moderator:', message.author, true)
  //  .addField("New name:", newusername)
  //  .setColor("0xFF0000")
  //  .setTimestamp()
  // ch.send(embed)
};

module.exports.help = {
    name: "nickname",
    description: "change someone nickname",
    category: "Moderator",
    usage: "`nickame <@user> <newNickname>`" 
}