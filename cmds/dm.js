const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first()
  if(!user) return
  if (!args.join(" ")) return
  const embed = args.slice(1).join(" ");
  const emb = new Discord.RichEmbed()
  .setTitle(`DM Message| By ${message.author.username}`)
  .setDescription(embed)
  .setColor('#8ffbff')
  .setFooter(message.author.tag, message.author.avatarURL)
  .setTimestamp()
  user.send(emb);

  let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: DM Message")
    .setDescription(
      `**Succesfully send DM To ${message.mentions.users.first().tag}**`
    )
    .setColor("#ff2050")
    .setFooter(`Moderator ${message.author.username}`);
  message.channel.send(embed1).then(m => m.delete(10000));
  message.delete();
};

module.exports.help = {
    name: "send",
    description: "send DM to someone",
    category: "Moderator", 
    usage: "`send <@user> <text>`"
}