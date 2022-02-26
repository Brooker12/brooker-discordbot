const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addrole",
  description: "add users roles with mention roles",
  category: "Moderation",
  usage: "`addrole <@user> <@roles | roles_name>`",
  botPermission: ["MANAGE_ROLES"],
  authorPermission: ["MANAGE_ROLES"],
  aliases: [],
  run: async (client, message, args) => {
    
    if (!args[0]) return client.sendMissing(module.exports.usage)

    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        x => x.user.username.toLowerCase() === args[0].toLowerCase()
      ) ||
      message.guild.members.cache.find(
        x => x.displayName.toLowerCase() === args[0].toLowerCase()
      );

    if (!user) return client.sendInvalid("I can't get that user");
    if (!user.manageable) return client.sendInvalid("I can't add role to this user");
    if (!args[1]) return client.sendInvalid("Mentions the roles to be added");

    let roles =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[1]) ||
      message.guild.roles.cache.find(
        a => a.name.toLowerCase() === args[1].toLowerCase()
      );
    
    if (!roles) return client.sendInvalid("I can't get that role")
    if (user.roles.cache.has(roles.id)) return client.sendInvalid("This user already have that roles")
    if (!roles.editable) return client.sendInvalid("i can't access that roles")

    user.roles.add(roles).then(() => {
      let embed = new MessageEmbed()
        .setColor(client.config.color)
        .setTitle("Mod: Add Roles")
        .setDescription(
          `Successfuly added role **${roles.name}** to **${user.user.username}**`
        )
        .setFooter(`Moderator: ${message.author.username}`);
      message.channel.send(embed);
    });
  }
};
