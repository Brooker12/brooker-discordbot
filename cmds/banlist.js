const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => { 

let bannedUsers = await message.guild.fetchBans(true);
  if (!bannedUsers.size) {
     const emb = new Discord.RichEmbed()
    .setColor('#f01515')
    .setTitle('Banned User')
    .setDescription('Members of your server look pretty decent. No one has been banned yet!')
    return await message.channel.send(emb);
  }

  let noOfPages = bannedUsers.size / 10;
  let i = (args.page > 0 && args.page < noOfPages + 1) ? args.page : 1;
  i = i - 1;

  message.guild.fetchBans()
  .then(banned => {
    let list = banned.map(user => user.tag).join('\n');

    // Make sure if the list is too long to fit in one message, you cut it off appropriately.
    if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;

    
 const emb = new Discord.RichEmbed()
    .setColor('#67b358')
    .setTitle('Banned User')
    .setDescription(list)
    .setFooter(`Page: ${i + 1} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`)

    message.channel.send(emb);
  })
};

module.exports.help = {
    name: "banlist",
    description: "show banned list",
    category: "Moderator",
    usage: "`a.banlist`"
}