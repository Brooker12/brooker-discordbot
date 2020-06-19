const Discord = require("discord.js");
exports.run = (client, message, args) => {
  let ch = message.guild.channels.get("693128532598980688");
  var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription("You need the `Ban Member` permission to use this command!")
    .setTimestamp();
  if (
    !message.member.hasPermission("BAN_MEMBERS") &&
    message.author.id !== "629937326545567744"
  )
    return message.channel
      .send(missingPermissionsEmbed)
      .then(m => m.delete(5000));
  let User = args[0];
  var missingArgsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.unban [@UserID] [Reason]`")
    .setTimestamp();
  
  let reason = args.slice(1).join(" ");
  if (!reason) {
    reason = "No reason given";
  } else {
    reason = `${reason}`;
  }
  
  if (!User) 
  message.channel.send(missingArgsEmbed).catch(console.error);
 message.guild.fetchBans()
.then(bans => {
if (bans.some(u => User.includes(u.username))) {
let user = bans.find(user => user.username === User);
message.guild.unban(user.id, reason);
 let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Unbanned")
    .setDescription(`**Unbanned** ${user.tag} **Reason:** ${reason}`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1).then(m => m.delete(10000));
     } else {
return message.reply(`This person is not banned you can see ban list: \`a.banlist\``);
}
  // const embed = new Discord.RichEmbed()
  // .setFooter(message.author.username, message.author.avatarURL)
  // .setColor("#25c059")
  // .setTitle(`UnBanned`)
  // .addField("User", `<@${user}>`, true)
  // .addField("Moderator", message.author.username, true)
  // .addField("Reason", reason)
  // .setTimestamp();
  // ch.send(embed);
 })
}


module.exports.help = {
    name: "Unbann",
    description: "Unban user ban",
    category: "Moderator",
    usage: "`unban <username> <reason>`"
}