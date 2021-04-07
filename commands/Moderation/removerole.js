const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "removerole",
  description: "remove users roles with mention roles",
  category: "Moderation",
  usage: "`removerole <@user> <@roles | roles_name>`",
  botPermission: ["MANAGE_ROLES"],
  authorPermission: ["MANAGE_ROLES"],
  aliases: [],
  run: async (client, message, args) => {
    let ctx = new MessageEmbed()
      .setColor(client.config.color)
      .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
      .setDescription("**Mentions users first!**");
    if (!args[0]) return message.channel.send(ctx);

    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        x => x.user.username.toLowerCase() === args[0].toLowerCase()
      ) ||
      message.guild.members.cache.find(
        x => x.displayName.toLowerCase() === args[0].toLowerCase()
      );

    let ctxx = new MessageEmbed()
      .setColor(client.config.color)
      .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
      .setDescription("**I can't get that user**");
    let ctxn = new MessageEmbed()
      .setColor(client.config.color)
      .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
      .setDescription("**I can't remove role to this users**");

    if (!user) return message.channel.send(ctxx);
    if (!user.manageable) return message.channel.send(ctxn);

    let ctxa = new MessageEmbed()
      .setColor(client.config.color)
      .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
      .setDescription("**Mentions the roles to be removed**");
    if (!args[1]) return message.channel.send(ctxa);

    let roles =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[1]) ||
      message.guild.roles.cache.find(
        a => a.name.toLowerCase() === args[1].toLowerCase()
      );

    let ctxas = new MessageEmbed()
      .setColor(client.config.color)
      .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
      .setDescription("**I can't get that role**");
    let ctxb = new MessageEmbed()
      .setColor(client.config.color)
      .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
      .setDescription("**This users not have that roles**");
    let ctxz = new MessageEmbed()
      .setColor(client.config.color)
      .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
      .setDescription("**I can't acces that roles**");

    if (!roles) return message.channel.send(ctxas);
    if (user.roles.cache.has(roles.id)) return message.channel.send(ctxb);
    if (!roles.editable) return message.channel.send(ctxz);

    user.roles.remove(roles).then(() => {
      let embed = new MessageEmbed()
        .setColor(client.config.color)
        .setTitle("Mod: Remove Roles")
        .setDescription(
          `Succseffully remove **${roles.name}** to **${user.user.username}**`
        )
        .setFooter(`Moderator: ${message.author.username}`);
      message.channel.send(embed);
    });
  }
};
