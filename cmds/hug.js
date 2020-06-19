const Discord = require("discord.js");
exports.run = (client, message, args) => {

if (message.author.bot) return;
    const user = message.mentions.users.first();
    let ags = message.mentions.users.first();
    if (!ags) return message.channel.send("Mention Someone To hug");
    var string = `https://media.tenor.com/images/9fe95432f2d10d7de2e279d5c10b9b51/tenor.gif
https://cdn.weeb.sh/images/SywetdQvZ.gif
https://cdn.weeb.sh/images/ryuhhuJdb.gif
https://media.tenor.com/images/c2e5126c39ad5f3a1a2ae31f3e784da8/tenor.gif
https://media.tenor.com/images/b6d0903e0d54e05bb993f2eb78b39778/tenor.gif
https://media.tenor.com/images/2e1d34d002d73459b6119d57e6a795d6/tenor.gif
https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif
https://media.tenor.com/images/7a6c91842f8b2871ecf5234bcd095da7/tenor.gif
https://media.tenor.com/images/b33ef6cb7106fd72276a18558e4a3183/tenor.gif
https://cdn.weeb.sh/images/rkx1dJ25z.gif
https://cdn.weeb.sh/images/BkuUhO1OW.gif
https://cdn.weeb.sh/images/BJCCd_7Pb.gif`;
    var words = string.split("\n");
    let random = words[Math.floor(Math.random() * words.length)];
    const embed = new Discord.RichEmbed()
      .setTitle(`${message.author.username} Hugs ${user.username}`)
    .setColor("#ffffff")
      .setImage(`${random}`);
    message.channel.send(embed);
}
module.exports.help = {
    name: "hug",
    description: "hug someone in image",
    category: "Action",
    usage: "`hug <@user>`"
}