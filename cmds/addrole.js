const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let ch = message.guild.channels.get("693128532598980688");
  let xdemb = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.addrole [@User] [@role]`")
    .setTimestamp();
  var missingPermissionsEmbed = new Discord.RichEmbed()
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `Manage Roles` permission to use this command!"
    )
    .setTimestamp();
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(missingPermissionsEmbed);
  let rMember =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  let role = args.join(" ").slice(22);
  if (!role) return message.channel.send(xdemb).then(m => m.delete(5000));
  let gRole = message.mentions.roles.first();
  if (!gRole) return message.channel.send("Couldn't find that role.");
  if (!rMember) return message.channel.send(xdemb).then(m => m.delete(5000));
  if (rMember.roles.has(gRole.id))
    return message.channel.send("This user already have that role.");
  await rMember.addRole(gRole);

  let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Add Roles")
    .setDescription(
      `**Give Role ${role} To ${message.mentions.users.first().tag}**`
    )
    .setColor("#ff2050")
    .setFooter(`Modearator ${message.author.username}`);
  message.channel.send(embed1)
};

module.exports.help = {
  name: "addrole",
  description: "Add role to someone",
  category: "Moderator",
  usage: "`addrole <@user> <@Role>`"
};
    