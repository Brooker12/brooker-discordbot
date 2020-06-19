const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
if (message.author.bot) return;
    const user = message.mentions.users.first();
    let arg = message.mentions.users.first();
    if (!arg)
      return message.channel.send(
        "🚫 Wrong Arguments , Please Mention User To Slap"
      );
    var string = `https://cdn.weeb.sh/images/SkNimyKvZ.gif
https://cdn.weeb.sh/imawges/Sk0RmyYvb.gif
https://cdn.weeb.sh/images/Hk6JVkFPb.gif
https://cdn.weeb.sh/images/H1n57yYP-.gif
https://cdn.weeb.sh/images/By2iXyFw-.gif
https://cdn.weeb.sh/images/HyPjmytDW.gif
https://cdn.weeb.sh/images/rJYqQyKv-.gif
https://cdn.weeb.sh/images/BkzyEktv-.gif`;
    var words = string.split("\n");
    let random = words[Math.floor(Math.random() * words.length)];
    const embed = new Discord.RichEmbed()
      .setTitle(
        `Looks Like ${message.author.username} slaps ${user.username}! He deserved that!`)
      .setColor("#ffffff")
      .setImage(`${random}`)
    message.channel.send(embed);
}

module.exports.help = {
    name: "Slap",
    description: "Slap someone in image",
    category: "action",
    usage: "`slap <@user>`"
}