const Discord = require("discord.js");
exports.run = (client, message, args) => {



const user = message.mentions.users.first();
    let ahh = message.mentions.users.first();
    if (!ahh) return message.channel.send("Mention A Person to Kill");
    var string = `https://media.tenor.com/images/e52e06dd7769437c92e6dfebf79d6ee9/tenor.gif
https://media.tenor.com/images/4156064ef9ad8f9060fe772d3bc3f452/tenor.gif
https://media.tenor.com/images/fe89919039e43c4c681bdb46358a502f/tenor.gif
https://media.tenor.com/images/830e1d256c70b77a0dc0ae847fd490c8/tenor.gif
https://media.tenor.com/images/babd3dceeb18a22a3f3ae44482221917/tenor.gif`;
    var words = string.split("\n");
    let random = words[Math.floor(Math.random() * words.length)];
    const embed = new Discord.RichEmbed()
      .setTitle(`${message.author.username} Kills ${user.username}`)
    .setColor("#ffffff")
    .setImage(`${random}`);
    message.channel.send(embed);
  }

module.exports.help = {
    name: "kill",
    description: "kill someone in image",
    category: "Image",
    usage: "`image <user>`"
}