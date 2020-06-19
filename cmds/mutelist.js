const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let muteRole = message.guild.roles.find(role => role.name === 'muted'), mutedMembers = [];
  if(!muteRole) return message.channel.send('Kamu belum pernah mute seseorang')
  if (muteRole) {
    mutedMembers = muteRole.members.map(member => member.user.tag);
  }

  if (mutedMembers.length) {
    mutedMembers = mutedMembers.map((l, i) => `**${i + 1}.**  ${l}`);

    let noOfPages = mutedMembers.length / 10;
    let i = (args.page > 0 && args.page < noOfPages + 1) ? args.page : 1;
    i = i - 1;

    const emb = new Discord.RichEmbed()
    .setTitle('Muted User')
    .setColor('#67b358')
    .setDescription(mutedMembers.join('\n'))
    .setFooter(`Page: ${i + 1} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`)
    
    
    await message.channel.send(emb);
  }
  else {
    const emb = new Discord.RichEmbed()
    .setTitle('Muted User')
     .setColor('#f01515')
    .setDescription('The list\'s empty! No one is currently muted in this server.')
    
    await message.channel.send(emb);
  }
};

exports.config = {
  aliases: [],
  enabled: true,
  argsDefinitions: [
    { name: 'page', type: Number, defaultOption: true, defaultValue: 1 }
  ]
};

module.exports.help = {
    name: "mutelist",
    description: "show user muted",
    category: "Moderator",
    usage: "a.mutelist"
}