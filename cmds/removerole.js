const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let ch = message.guild.channels.get("693128532598980688");
  let xdemb = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.removerole [@User] [@role]`")
    .setTimestamp();
  var p = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `Manage Roles` permission to use this command!"
    )
    .setTimestamp();
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(p);
  let rMember =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  if (!rMember) return message.channel.send(xdemb).then(m => m.delete(5000));

  let role = args.join(" ").slice(22);

  if (!role) return message.channel.send(xdemb).then(m => m.delete(5000));
  let gRole = message.mentions.roles.first();
  if (!gRole) return message.channel.send("Couldn't find that role.");

  if (!rMember.roles.has(gRole.id))
    return message.channel.send("This user doesn't have that role.");
  await rMember.removeRole(gRole.id);
  let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Remove Roles")
    .setDescription(`**Remove Role ${gRole} To ${message.mentions.users.first().tag}**`)
    .setColor("#ff2050")
    .setFooter(`Modearator ${message.author.username}`);
   message.channel.send(embed1)
  // const embed = new Discord.RichEmbed()
  //   .setAuthor(
  //     "[RemoveRole] " + message.mentions.users.first().tag,
  //     message.mentions.users.first().avatarURL
  //   )
  //   .setFooter(message.author.username, message.author.avatarURL)
  //   .addField("User", message.mentions.users.first(), true)
  //   .addField("Moderator:", message.author, true)
  //   .addField("Roles", `${gRole.name}`)
  //   .setColor("0xFF0000")
  //   .setTimestamp();
  // ch.send(embed);
  // message.delete();
};

module.exports.help = {
    name: "removerole",
    description: "remove someone role",
    category: "Moderator",
    usage: "`removerole <@user> <@role>`"
}