const Discord = require("discord.js");
exports.run = (client, message, args) => {


if (message.author.bot) return;
    const user = message.mentions.users.first();
    let ahh = message.mentions.users.first();
    if (!ahh)
      return message.channel.send(
        "Mention Someone to say Hello"
      );
    var string = `https://cdn.weeb.sh/images/H1Q2Vo2RW.gif
https://cdn.weeb.sh/images/ByJNVo30-.gif
https://cdn.weeb.sh/images/ry-a4s2Cb.gif
https://cdn.weeb.sh/images/rJS6NihCb.gif
https://cdn.weeb.sh/images/BJuhEi2Ab.gif
https://cdn.weeb.sh/images/rJzvNjh0Z.gif`;
    var words = string.split("\n");
    let random = words[Math.floor(Math.random() * words.length)];
    const embed = new Discord.RichEmbed()
      .setTitle(`${message.author.username} Says Hello to ${user.username}`)
      .setColor("#ffffff")
    .setImage(`${random}`);
    message.channel.send(embed);
}

module.exports.help = {
    name: "Wave",
    description: "Wave to someone",
    category: "Action",
    usage: "`wave <@user>`"
}