
const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
   if (message.author.bot) return;
    const user = message.mentions.users.first();
    let ags = message.mentions.users.first();
    if (!ags)
      return message.channel.send(
        "🚫 Wrong Arguments , Please Mention User To Punch"
      );
    var string = `https://media.tenor.com/images/00a3cca756b4bbae191ac33ccc6d7bcf/tenor.gif 
https://cdn.discordapp.com/attachments/699144159751045150/699538300792471602/tenor2.gif
https://media.tenor.com/images/8a79543998d6878be573aab94ae86456/tenor.gif
https://media.tenor.com/images/5b668436338971d42469d7348a5340e5/tenor.gif
https://media.tenor.com/images/483ede2afbcf3afca6465d0de112c0d5/tenor.gif
https://media.tenor.com/images/61904d1fdbcc0d18595569e8bcc49c5e/tenor.gif
https://media.tenor.com/images/32d7dd9066896c0f82ea90b393f6ab6c/tenor.gif
https://media.tenor.com/images/1a5a95ac441e586a56aa3e5bb9155555/tenor.gif
https://media.tenor.com/images/54f3b057bf770afabdcd9c73b389fa1a/tenor.gif`;
    var words = string.split("\n");
    let random = words[Math.floor(Math.random() * words.length)];
    const embed = new Discord.RichEmbed()
      .setTitle(`${message.author.username} Punches ${user.username} Woah!`)
    .setColor("#ffffff")
      .setImage(`${random}`);
    message.channel.send(embed);
  }
module.exports.help = {
    name: "punch",
    description: "punch someone in image",
    category: "Action",
    usage: "`punch <@user>`"
}